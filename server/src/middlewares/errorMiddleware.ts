import { HttpException } from '../exceptions/httpException';
import { NextFunction, Request, Response } from 'express';
import { Prisma } from '@prisma/client';

const errorMiddleware = (
  error: HttpException | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  {
    try {
      let status = 500;
      let message = 'Internal server error';

      if (error instanceof HttpException) {
        status = error.status;
        message = error.message;
      } else if (error instanceof SyntaxError) {
        // If json body parse failed
        status = 400;
        message = 'Bad request!';
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          // Foreign key constraint failed
          case 'P2003': {
            status = 404;
            message = 'Not found!';
            break;
          }
        }
      }

      res.status(status).json({ message });
    } catch (error) {
      next(error);
    }
  }
};
export default errorMiddleware;
