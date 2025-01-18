import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import userRouter from './user/router/UserRouter';
import postRouter from './post/router/PostRouter';
import commentRouter from './comment/router/CommentRouter';

const app = express();
const port = 4000;

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.status(404).send('Endpoint not in use');
});

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
