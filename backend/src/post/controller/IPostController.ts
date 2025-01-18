export interface IPostController {
  listPostsWithAuthor(): Promise<any>;
  getPostWithAuthor(postId: string): Promise<any>;
}
