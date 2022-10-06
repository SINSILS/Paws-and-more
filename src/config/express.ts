import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { ORIGIN } from '../constants';
import { authRouter } from '../routes/auth.router';
import { indexRouter } from '../routes/index.router';

const expressConfig = () => {
  const app = express();

  app.use(cors({ origin: ORIGIN, credentials: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use('/api', indexRouter);
  app.use('/api/auth', authRouter);

  return app;
};

export default expressConfig;
