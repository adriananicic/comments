import { createCommentReturn } from '../../types/createCommentReturn';
import { getCommentReturn } from '../../types/getCommentReturn';

export interface ICommentRepository {
  create(data: {
    body: string;
    commenterId: string;
    postId: string;
    parentCommentId?: string;
  }): Promise<createCommentReturn>;
  list(): Promise<getCommentReturn[]>;
  listByPost(
    postId: string,
    isRefetching: boolean,
    cursor?: string
  ): Promise<getCommentReturn[]>;
  listCommentChildren(commentId: string): Promise<getCommentReturn[]>;
  update(
    commentId: string,
    newCommentBody: string
  ): Promise<createCommentReturn>;
  delete(commentId: string): Promise<createCommentReturn>;
}
