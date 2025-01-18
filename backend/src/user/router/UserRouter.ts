import { Response, Router, Request } from 'express';
import { PrismaUserRepository } from '../repository/PrismaUserRepository';
import { UserController } from '../controller/UserController';

const userRouter = Router();
const userRepository = new PrismaUserRepository();
const userController = new UserController(userRepository);
userRouter.get('/list', async (_req: Request, res: Response) => {
  try {
    const users = await userController.getAllUsers();
    res.status(200).json({ data: users });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default userRouter;
