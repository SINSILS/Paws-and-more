import { HttpException } from '../exceptions/httpException';
import { NextFunction, Request, Response } from 'express';

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    let status = error.status;
    let message = error.message;

    // Don't show error to user
    if (!(error instanceof HttpException)) {
      status = 500;
      message = 'Internal server error';
    }

    res.status(status).json({ message });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
