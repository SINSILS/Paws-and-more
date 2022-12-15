import { userService } from '../services/user.service';
import { NextFunction, Request, Response } from 'express';

const getUserData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.getUserData(req.tokenData.id);
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

const getUserPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await userService.getUserPosts(req.tokenData.id);
    res.status(200).send(posts);
  } catch (error) {
    next(error);
  }
};

export const userController = { getUserData, getUserPosts };
