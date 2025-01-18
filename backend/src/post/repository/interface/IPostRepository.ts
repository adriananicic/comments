import { getPostReturn } from '../../types/getPostReturn';
import { listPostReturn } from '../../types/listPostReturn';

export interface IPostRepository {
  listPostsWithAuthor(): Promise<listPostReturn>;
  getPostWithAuthor(
    postId: string
  ): Promise<Omit<getPostReturn, 'comments'> | null>;
}
