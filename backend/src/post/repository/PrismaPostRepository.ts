import prisma from '../../../lib/prisma/prisma-client';
import { getCommentReturn } from '../../comment/types/getCommentReturn';
import { getPostReturn } from '../types/getPostReturn';
import { listPostReturn } from '../types/listPostReturn';
import { IPostRepository } from './interface/IPostRepository';

export class PrismaPostRepository implements IPostRepository {
  listPostsWithAuthor(): Promise<listPostReturn> {
    try {
      const posts = prisma.post.findMany({
        include: {
          author: true,
        },
        orderBy: { timestamp: 'desc' },
      });
      return posts;
    } catch (error) {
      throw new Error('Unexpected error while fetching posts.');
    }
  }

  getPostWithAuthor(
    postId: string
  ): Promise<Omit<getPostReturn, 'comments'> | null> {
    try {
      const post = prisma.post
        .findUnique({
          where: {
            postId: postId,
          },
          include: {
            author: true,
          },
        })
        .then((res) => {
          if (!res) return res;
          const { author, ...rest } = res;
          return { author: res.author, ...rest };
        });

      return post;
    } catch (error) {}
    throw new Error('Method not implemented.');
  }
}
