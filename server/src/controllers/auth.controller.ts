import { NextFunction, Request, Response } from 'express';
import { authService } from '../services/auth.service';

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: {
      email: string;
      username: string;
      password: string;
    } = req.body;
    const token = await authService.register(data);

    res.status(200).send(token);
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: { email: string; password: string } = req.body;
    const token = await authService.login(data);

    res.status(200).send({ token: token });
  } catch (error) {
    next(error);
  }
};

export const authController = { login, register };
