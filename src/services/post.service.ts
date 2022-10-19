import { prisma } from '../config/prisma';
import { HttpException } from '../exceptions/httpException';

const getTopicPosts = async (animalTypeId: string, topicId: string) => {
  // const posts = await prisma.post.findMany({
  //   where: { ownerTopicId: id },
  //   select: {
  //     id: true,
  //     title: true,
  //     content: true,
  //     ownerTopic: true,
  //     ownerUser: true,
  //   },
  const topicPosts = await prisma.$queryRaw`select p.*
                                            from "Post" p
                                            join "Topic" t on t.id = ${topicId}
                                            join "AnimalType" a on a.id = ${animalTypeId}
                                            where p."ownerTopicId" = t.id`;
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

const getPost = async (id: string) => {
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) {
    throw new HttpException(404, 'Post not found!');
  }
  return post;
};

const createPost = async (data: {
  title: string;
  content: string;
  ownerUserId: string;
  ownerTopicId: string;
}) => {
  const post = await prisma.post.create({
    data: {
      title: data.title,
      content: data.content,
      ownerUserId: data.ownerUserId,
      ownerTopicId: data.ownerTopicId,
    },
  });
  return post;
};

const updatePost = async (data: { title: string; content: string }, id: string) => {
  const post = await prisma.post.update({
    where: { id: id },
    data: { title: data.title, content: data.content },
  });
  return post;
};

const deletePost = async (id: string) => {
  const post = await prisma.post.delete({
    where: { id: id },
  });
  return post;
};

export const postService = {
  getTopicPosts,
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
