import { NextFunction, Request, Response, Router } from 'express';
import { CommentController } from '../controller/CommentController';
import { PrismaCommentRepository } from '../repository/PrismaCommentRepository';

const commentRouter = Router();
const repo = new PrismaCommentRepository();
const commentController = new CommentController(repo);

commentRouter.get(
  '/getPostComments',
  async (
    req: Request<any, any, any, { postId: string; parentCommentId?: string }>,
    res: Response
  ) => {
    const params = {
      postId: req.query.postId,
      parentCommentId: req.query.parentCommentId,
    };
    try {
      const newComment = await commentController.getPostComments(
        params.postId,
        params.parentCommentId
      );
      if (newComment) res.status(200).json({ data: newComment });
      // res.status(500).json({ message: 'Unexpected error occured.' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

commentRouter.post('/create', async (req: Request, res: Response) => {
  const createData = req.body;
  try {
    const newComment = await commentController.createComment(createData);
    if (newComment) res.status(200).json({ success: true });
    // res.status(500).json({ message: 'Unexpected error occured.' });
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
      if (deletedComment) res.status(200).json({ success: true });
      // res.status(500).json({ message: 'Unexpected error occured.' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

export default commentRouter;
