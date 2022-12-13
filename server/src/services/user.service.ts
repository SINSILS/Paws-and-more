import { prisma } from '../config/prisma';
import { HttpException } from '../exceptions/httpException';

export const getById = async (id: string) => {
  const findUser = await prisma.user.findUnique({
    where: { id: id },
    select: { username: true, email: true },
  });

  if (!findUser) throw new HttpException(400, 'Failed to retrieve user');

  return findUser;
};

export const getUserPosts = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id }, select: { ownedPosts: true } });

  if (!user) throw new HttpException(400, 'Failed to retrieve user');

  return user;
};
