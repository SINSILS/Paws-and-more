import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { ORIGIN } from '../constants';
import errorMiddleware from '../middlewares/errorMiddleware';
import { animalTypeRouter } from '../routes/animalType.router';
import { authRouter } from '../routes/auth.router';
import { postRouter } from '../routes/post.router';
import { topicRouter } from '../routes/topic.router';
import { userRouter } from '../routes/user.router';
// import { indexRouter } from '../routes/index.router';

const expressConfig = () => {
  const app = express();

  app.use(cors({ origin: ORIGIN, credentials: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use('/api', animalTypeRouter);
  app.use('/api', topicRouter);
  app.use('/api', postRouter);
  app.use('/api', authRouter);
  app.use('/api', userRouter);
  app.use((req, res) => {
    res.status(400).send(JSON.parse('Bad request.'));
  });
  app.use(errorMiddleware);

  return app;
};

export default expressConfig;
