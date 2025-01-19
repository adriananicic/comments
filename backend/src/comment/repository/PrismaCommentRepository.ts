import { getCommentReturn } from '../types/getCommentReturn';
import { ICommentRepository } from './interface/commentdbInterface';
import prisma from '../../../lib/prisma/prisma-client';
import { PrismaCommentMapper } from './mappers/PrismaCommentMapper';
import { createCommentReturn } from '../types/createCommentReturn';

const commentMapper = new PrismaCommentMapper();

export class PrismaCommentRepository implements ICommentRepository {
  create(data: {
    body: string;
    commenterId: string;
    postId: string;
    parentCommentId?: string;
  }): Promise<createCommentReturn> {
    try {
      const newComment = prisma.comment.create({
        data: data,
      });
      return newComment;
    } catch (error) {
      throw new Error(
        'Error while trying to create comment input. Please try again.'
      );
    }
  }
  list(): Promise<getCommentReturn[]> {
    throw new Error('Method not implemented.');
  }
  listByPost(
    postId: string,
    isRefetching: boolean,
    cursor?: string // last comment ID
  ): Promise<getCommentReturn[]> {
    try {
      const commentsWithChildren = prisma.comment
        .findMany({
          where: {
            postId: postId,
            parentCommentId: null,
          },
          include: {
            _count: {
              select: { childComments: true },
            },
            childComments: {
              include: {
                _count: {
                  select: { childComments: true },
                },
                commenter: true,
              },
            },
            commenter: true,
          },
          orderBy: { timestamp: 'asc' },
          cursor: cursor ? { commentId: cursor } : undefined,
          skip: cursor ? 1 : undefined,
          take: isRefetching ? undefined : -10,
        })
        .then((res) => {
          return res.map((comment) => commentMapper.mapComment(comment));
        });
      return commentsWithChildren;
    } catch (error) {
      throw new Error('Error while fetching blog post comments.');
    }
  }

  listCommentChildren(commentId: string): Promise<getCommentReturn[]> {
    try {
      const childComments = prisma.comment
        .findMany({
          where: {
            parentCommentId: commentId,
          },
          include: {
            _count: {
              select: { childComments: true },
            },
            // childComments: {
            //   include: {
            //     _count: {
            //       select: { childComments: true },
            //     },
            //   },
            // },
            commenter: true,
          },
          orderBy: { timestamp: 'asc' },
          take: -10,
        })
        .then((res) => {
          return res.map((comment) => commentMapper.mapComment(comment));
        });
      return childComments;
    } catch (error) {
      throw new Error('Error while fetching blog post comments.');
    }
  }

  update(
    commentId: string,
    newCommentBody: string
  ): Promise<createCommentReturn> {
    try {
      const updatedComment = prisma.comment.update({
        where: {
          commentId: commentId,
        },
        data: {
          body: newCommentBody,
        },
      });
      return updatedComment;
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }
  async delete(commentId: string): Promise<createCommentReturn> {
    try {
      const deletedComment = await prisma.comment.delete({
        where: {
          commentId: commentId,
        },
      });
      return deletedComment;
    } catch (error) {
      throw new Error('Error while deleting comment.');
    }
  }
}
