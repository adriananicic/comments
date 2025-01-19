import { createCommentReturn } from '../../types/createCommentReturn';
import { getCommentReturn } from '../../types/getCommentReturn';

export interface ICommentController {
  createComment(data: {
    body: string;
    commenterId: string;
    postId: string;
    parentCommentId?: string;
  }): Promise<createCommentReturn>;
  listComments(): Promise<getCommentReturn[]>;
  getPostComments(
    postId: string,
    isRefetching?: string,
    cursor?: string
  ): Promise<getCommentReturn[]>;
  getReplies(commentId: string): Promise<getCommentReturn[]>;
  updateComment(
    commentId: string,
    newCommentBody: string
  ): Promise<createCommentReturn>;
  deleteComment(commentId: string): Promise<createCommentReturn>;
}
