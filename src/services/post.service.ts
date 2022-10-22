import { prisma } from '../config/prisma';
import { HttpException } from '../exceptions/httpException';

const getTopicPost = async (animalTypeId: string, topicId: string) => {
  const animalType = await prisma.animalType.findUnique({ where: { id: animalTypeId } });
  if (!animalType) {
    throw new HttpException(404, 'Animal type not found!');
  }
  const topic = await prisma.topic.findUnique({ where: { id: topicId } });
  if (!topic) {
    throw new HttpException(404, 'Topic not found!');
  }
  const topicPosts = await prisma.post.findMany({
    where: { ownerTopicId: topicId },
    select: {
      id: true,
      title: true,
      content: true,
      ownerTopicId: true,
      ownerUserId: true,
    },
  });
  return topicPosts;
};

const getPosts = async () => {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      ownerTopic: true,
      ownerUser: true,
    },
  });

  return posts;
};

const getPost = async (animalTypeId: string, topicId: string, id: string) => {
  const animalType = await prisma.animalType.findUnique({ where: { id: animalTypeId } });
  if (!animalType) {
    throw new HttpException(404, 'Animal type not found!');
  }
  const topic = await prisma.topic.findUnique({ where: { id: topicId } });
  if (!topic) {
    throw new HttpException(404, 'Topic not found!');
  }
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) {
    throw new HttpException(404, 'Post not found!');
  }
  return post;
};

const createPost = async (
  animalTypeId: string,
  topicId: string,
  data: {
    title: string;
    content: string;
    ownerUserId: string;
  }
) => {
  const animalType = await prisma.animalType.findUnique({ where: { id: animalTypeId } });
  if (!animalType) {
    throw new HttpException(404, 'Animal type not found!');
  }
  const topic = await prisma.topic.findUnique({ where: { id: topicId } });
  if (!topic) {
    throw new HttpException(404, 'Topic not found!');
  }
  const post = await prisma.post.create({
    data: {
      title: data.title,
      content: data.content,
      ownerUserId: data.ownerUserId,
      ownerTopicId: topicId,
    },
  });
  return post;
};

const updatePost = async (
  animalTypeId: string,
  topicId: string,
  id: string,
  data: { title: string; content: string }
) => {
  const animalType = await prisma.animalType.findUnique({ where: { id: animalTypeId } });
  if (!animalType) {
    throw new HttpException(404, 'Animal type not found!');
  }
  const topic = await prisma.topic.findUnique({ where: { id: topicId } });
  if (!topic) {
    throw new HttpException(404, 'Topic not found!');
  }
  const tempPost = await prisma.post.findUnique({ where: { id } });
  if (!tempPost) {
    throw new HttpException(404, 'Post not found!');
  }
  const post = await prisma.post.update({
    where: { id: id },
    data: { title: data.title, content: data.content },
  });
  return post;
};

const deletePost = async (animalTypeId: string, topicId: string, id: string) => {
  const animalType = await prisma.animalType.findUnique({ where: { id: animalTypeId } });
  if (!animalType) {
    throw new HttpException(404, 'Animal type not found!');
  }
  const topic = await prisma.topic.findUnique({ where: { id: topicId } });
  if (!topic) {
    throw new HttpException(404, 'Topic not found!');
  }
  const tempPost = await prisma.post.findUnique({ where: { id } });
  if (!tempPost) {
    throw new HttpException(404, 'Post not found!');
  }
  const post = await prisma.post.delete({
    where: { id: id },
  });
  // return post;
};

export const postService = {
  getTopicPost,
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
