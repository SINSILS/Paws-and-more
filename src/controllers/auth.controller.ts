import { Request, Response } from 'express';
import { authService } from '../services/auth.service';

export const login = (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).send({ error: 'bad input' });
      return;
    }

    const data = authService.login(username, password);

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send();
  }
};

export const authController = { login };
