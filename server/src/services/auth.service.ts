import { prisma } from '../config/prisma';
import { compare, hash } from 'bcrypt';
import { HttpException } from '../exceptions/httpException';
import { signToken } from '../Utils/jwt';

const register = async (data: { email: string; username: string; password: string }) => {
  if (!data.email || !data.username || !data.password) throw new HttpException(400, 'Bad request');

  const findUser = await prisma.user.findUnique({ where: { email: data.email } });

  if (findUser) throw new HttpException(409, 'User already exists');

  const hashedPassword = await hash(data.password, 10);

  const createUserData = await prisma.user.create({
    data: { email: data.email, username: data.username, password: hashedPassword },
    select: { id: true, email: true, username: true, role: true },
  });

  const token = await signToken(createUserData.id, createUserData.role);

  return { token, ...createUserData };
};

const login = async (data: { email: string; password: string }) => {
  const findUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!findUser) throw new HttpException(401, 'Unauthorized');

  const isPasswordMatching = await compare(data.password, findUser.password);
  if (!isPasswordMatching) throw new HttpException(401, 'Unauthorized');

  const token = await signToken(findUser.id, findUser.role);

  return token;
};

export const authService = {
  register,
  login,
};
