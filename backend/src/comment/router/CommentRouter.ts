import { NextFunction, Request, Response, Router } from 'express';
import { CommentController } from '../controller/CommentController';
import { PrismaCommentRepository } from '../repository/PrismaCommentRepository';

const commentRouter = Router();
const repo = new PrismaCommentRepository();
const commentController = new CommentController(repo);

commentRouter.get(
  '/get/postComments',
  async (
    req: Request<
      any,
      any,
      any,
      { postId: string; isRefetching?: string; cursor?: string }
    >,
    res: Response
  ) => {
    const params = {
      postId: req.query.postId,
      isRefetching: req.query.isRefetching,
      cursor: req.query.cursor,
    };
    try {
      const newComment = await commentController.getPostComments(
        params.postId,
        params.isRefetching,
        params.cursor
      );

      res.status(200).json({ data: newComment });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

commentRouter.get(
  '/get/replies/:commentId',
  async (req: Request, res: Response) => {
    const commentId = req.params.commentId;
    try {
      const replies = await commentController.getReplies(commentId);
      console.log(`comment replies ${JSON.stringify(replies)}`);

      res.status(200).json({ data: replies });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

commentRouter.post('/create', async (req: Request, res: Response) => {
  const createData = req.body;
  try {
    const newComment = await commentController.createComment(createData);
    res.status(200).json({ success: true });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

commentRouter.delete(
  '/delete/:commentId',
  async (req: Request, res: Response) => {
    const commentId = req.params.commentId;
    try {
      const deletedComment = await commentController.deleteComment(commentId);
      res.status(200).json({ success: true });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

export default commentRouter;
