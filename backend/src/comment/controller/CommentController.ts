import { ICommentRepository } from '../repository/interface/commentdbInterface';
import { createCommentReturn } from '../types/createCommentReturn';
import { getCommentReturn } from '../types/getCommentReturn';
import { ICommentController } from './interface/ICommentController';

export class CommentController implements ICommentController {
  private CommentRepository: ICommentRepository;

  constructor(commentRepo: ICommentRepository) {
    this.CommentRepository = commentRepo;
  }
  async createComment(data: {
    body: string;
    commenterId: string;
    postId: string;
    parentCommentId?: string;
  }): Promise<createCommentReturn> {
    try {
      const newComment: createCommentReturn =
        await this.CommentRepository.create(data);
      if (newComment) return { success: true };
      return { success: false };
    } catch (error: any) {
      const err_msg = `Unexpected error occured while creating new comment.`;
      console.error(`${err_msg}\nError message: ${error.message}`);
      throw new Error(err_msg);
    }
  }
  listComments(): Promise<getCommentReturn[]> {
    throw new Error('Method not implemented.');
  }
  async getPostComments(
    postId: string,
    parentCommentId?: string
  ): Promise<getCommentReturn[]> {
    try {
      const comments = await this.CommentRepository.listByPost(
        postId,
        parentCommentId || undefined
      );
      return comments;
    } catch (error: any) {
      const err_msg = 'Unexpected error occured while fetching post comments.';
      console.error(`${err_msg}\nError message: ${error.message}`);
      throw new Error(err_msg);
    }
  }
  getReplies(commentId: string): Promise<getCommentReturn[]> {
    throw new Error('Method not implemented.');
  }
  async updateComment(
    commentId: string,
    newCommentBody: string
  ): Promise<createCommentReturn> {
    try {
      const updatedComment = await this.CommentRepository.update(
        commentId,
        newCommentBody
      );
      return updatedComment;
    } catch (error: any) {
      const err_msg = 'Unexpected error occured while updating comment.';
      console.error(`${err_msg}\nError message: ${error.message}`);
      throw new Error(err_msg);
    }
  }
  async deleteComment(commentId: string): Promise<createCommentReturn> {
    try {
      await this.CommentRepository.delete(commentId);
      return { success: true };
    } catch (error: any) {
      const err_msg = 'Unexpected error occured while updating comment.';
      console.error(`${err_msg}\nError message: ${error.message}`);
      throw new Error(err_msg);
    }
  }
}
