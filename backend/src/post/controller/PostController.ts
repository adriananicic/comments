import { IPostRepository } from '../repository/interface/IPostRepository';
import { IPostController } from './IPostController';

export class PostController implements IPostController {
  private PostRepository: IPostRepository;

  constructor(postRepo: IPostRepository) {
    this.PostRepository = postRepo;
  }

  async listPostsWithAuthor(): Promise<any> {
    try {
      const posts = await this.PostRepository.listPostsWithAuthor();
      return posts;
    } catch (error: any) {
      const err_msg = 'Unexpected error occured while fetching posts.';
      console.error(`${err_msg}.\nError message: ${error.message}`);
      throw new Error(err_msg);
    }
  }

  async getPostWithAuthor(postId: string): Promise<any> {
    try {
      const post = await this.PostRepository.getPostWithAuthor(postId);
      return post;
    } catch (error: any) {
      const err_msg = 'Unexpected error occured while fetching post.';
      console.error(`${err_msg}.\nError message: ${error.message}`);
      throw new Error(err_msg);
    }
  }
}
