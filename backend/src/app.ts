import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import userRouter from './user/router/UserRouter';
import postRouter from './post/router/PostRouter';
import commentRouter from './comment/router/CommentRouter';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
const port = 4000;
dotenv.config();
app.use(bodyParser.json());

app.use((req: Request, _res: Response, next: NextFunction) => {
  const yellowText = '\x1b[33m';
  const resetText = '\x1b[0m';
  console.log(
    `${yellowText}Request received for ${req.method} ${req.url} from ${req.hostname}${resetText}\n`
  );
  next();
});

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.get('/', (req: Request, res: Response) => {
  res.status(404).send('Endpoint not in use');
});

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
