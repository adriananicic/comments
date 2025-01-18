import { Request, Response, Router } from 'express';
import { PrismaPostRepository } from '../repository/PrismaPostRepository';
import { PostController } from '../controller/PostController';
import { defaultMaxListeners } from 'events';

const postRouter = Router();
const postRepo = new PrismaPostRepository();
const postController = new PostController(postRepo);

postRouter.get('/list', async (req: Request, res: Response) => {
  try {
    const posts = await postController.listPostsWithAuthor();
    if (posts) res.status(200).json({ data: posts });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

postRouter.get('/get/:postId', async (req: Request, res: Response) => {
  const postId = req.params.postId;
  try {
    const postWithAuthor = await postController.getPostWithAuthor(postId);
    if (postWithAuthor) res.status(200).json({ data: postWithAuthor });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default postRouter;
