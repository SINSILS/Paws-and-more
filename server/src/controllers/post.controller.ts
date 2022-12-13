import { postService } from '../services/post.service';
import { NextFunction, Request, Response } from 'express';

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await postService.getPosts();
    res.status(200).send(posts);
  } catch (error) {
    next(error);
  }
};

const getPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await postService.getPost(
      req.params.animalTypeId,
      req.params.ownerTopicId,
      req.params.id
    );
    res.status(200).send(post);
  } catch (error) {
    next(error);
  }
};

const getTopicPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const topicPosts = await postService.getTopicPost(
      req.params.animalTypeId,
      req.params.ownerTopicId
    );
    res.status(200).send(topicPosts);
  } catch (error) {
    next(error);
  }
};

const createPost = async (req: Request, res: Response, next: NextFunction) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({ message: 'Bad request!' });
  }
  try {
    const ownerUserId = req.tokenData.id;
    const post = await postService.createPost(
      req.params.animalTypeId,
      req.params.ownerTopicId,
      ownerUserId,
      req.body
    );
    res.status(201).send(post);
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({ message: 'Bad request!' });
  }
  try {
    const ownerUserId = req.tokenData.id;
    const post = await postService.updatePost(
      req.params.animalTypeId,
      req.params.ownerTopicId,
      req.params.id,
      ownerUserId,
      req.body
    );
    res.status(200).send(post);
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ownerUserId = req.tokenData.id;
    const post = await postService.deletePost(
      req.params.animalTypeId,
      req.params.ownerTopicId,
      req.params.id,
      ownerUserId
    );
    res.status(204).send(post);
  } catch (error) {
    next(error);
  }
};

export const postController = {
  getPosts,
  getPost,
  getTopicPost,
  createPost,
  updatePost,
  deletePost,
};
