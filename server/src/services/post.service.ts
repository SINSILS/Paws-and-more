import { prisma } from '../config/prisma';
import { HttpException } from '../exceptions/httpException';

const getTopicPost = async (animalTypeId: string, topicId: string) => {
  const topic = await prisma.topic.findFirst({ where: { id: topicId, animalTypeId } });
  if (!topic) {
    throw new HttpException(404, 'Not found!');
  }
  const topicPosts = await prisma.post.findMany({
    where: { ownerTopicId: topicId },
    select: {
      id: true,
      title: true,
      content: true,
      ownerTopicId: true,
      ownerUserId: true,
      ownerUser: { select: { username: true } },
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
  const topic = await prisma.topic.findFirst({ where: { id: topicId, animalTypeId } });
  if (!topic) {
    throw new HttpException(404, 'Not found!');
  }
  const post = await prisma.post.findFirst({
    where: { id, ownerTopicId: topicId },
    select: {
      id: true,
      title: true,
      content: true,
      ownerUser: { select: { username: true } },
    },
  });
  if (!post) {
    throw new HttpException(404, 'Not found!');
  }
  return post;
};

const createPost = async (
  animalTypeId: string,
  topicId: string,
  ownerUserId: string,
  data: {
    title: string;
    content: string;
  }
) => {
  if (!data.title || !data.content) {
    throw new HttpException(400, 'Bad request!');
  }
  const topic = await prisma.topic.findFirst({ where: { id: topicId, animalTypeId } });
  if (!topic) {
    throw new HttpException(404, 'Not found!');
  }
  const post = await prisma.post.create({
    data: {
      title: data.title,
      content: data.content,
      ownerUserId: ownerUserId,
      ownerTopicId: topicId,
    },
  });
  return post;
};

const updatePost = async (
  animalTypeId: string,
  topicId: string,
  id: string,
  ownerUserId: string,
  role: string,
  data: { title: string; content: string }
) => {
  const topic = await prisma.topic.findFirst({ where: { id: topicId, animalTypeId } });
  const tempPost = await prisma.post.findFirst({ where: { id, ownerTopicId: topicId } });
  if (!tempPost || !topic) {
    throw new HttpException(404, 'Not found!');
  }
  if (tempPost.ownerUserId != ownerUserId && role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
    throw new HttpException(403, 'Forbidden.');
  }
  const post = await prisma.post.update({
    where: { id: id },
    data: { title: data.title, content: data.content },
  });
  return post;
};

const deletePost = async (
  animalTypeId: string,
  topicId: string,
  id: string,
  ownerUserId: string,
  role: string
) => {
  const topic = await prisma.topic.findFirst({ where: { id: topicId, animalTypeId } });
  const tempPost = await prisma.post.findFirst({ where: { id, ownerTopicId: topicId } });
  if (!tempPost || !topic) {
    throw new HttpException(404, 'Not found!');
  }
  if (tempPost.ownerUserId != ownerUserId && role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
    throw new HttpException(403, 'Forbidden.');
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
