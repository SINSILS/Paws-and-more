import { prisma } from '../config/prisma';
import { HttpException } from '../exceptions/httpException';

const getUserData = async (id: string) => {
  const user = await prisma.user.findFirst({
    where: { id },
    select: { id: true, email: true, username: true, role: true },
  });

  if (!user) {
    throw new HttpException(404, 'Not found!');
  }

  return user;
};

const getUserPosts = async (id: string) => {
  const posts = await prisma.post.findMany({ where: { ownerUserId: id } });
  return posts;
};

export const userService = { getUserData, getUserPosts };
