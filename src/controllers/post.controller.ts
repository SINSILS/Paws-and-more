import { postService } from '../services/post.service';
import { NextFunction, Request, Response } from 'express';

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await postService.getPosts(req.params.ownerTopicId);
    res.status(200).send(posts);
  } catch (error) {
    next(error);
  }
};

const getPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await postService.getPost(req.params.id);
    res.status(200).send(post);
  } catch (error) {
    next(error);
  }
};

const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await postService.createPost(req.body);
    res.status(200).send(post);
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await postService.updatePost(req.body, req.params.id);
    res.status(200).send(post);
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await postService.deletePost(req.params.id);
    res.status(200).send(post);
  } catch (error) {
    next(error);
  }
};

export const postController = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
