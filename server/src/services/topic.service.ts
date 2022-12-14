import { Role } from '@prisma/client';
import { prisma } from '../config/prisma';
import { HttpException } from '../exceptions/httpException';

const getTopics = async (id: string) => {
  const topics = await prisma.topic.findMany({
    where: { animalTypeId: id },
    select: {
      id: true,
      title: true,
      description: true,
      animalType: true,
    },
  });
  if (!topics) {
    throw new HttpException(404, 'Not found');
  }
  return topics;
};

const getTopic = async (animalTypeId: string, id: string) => {
  const topic = await prisma.topic.findFirst({ where: { id: id, animalTypeId } });
  if (!topic) {
    throw new HttpException(404, 'Not found!');
  }
  return topic;
};

const getAnimalTypeTopics = async (animalTypeId: string) => {
  const animalType = await prisma.animalType.findUnique({ where: { id: animalTypeId } });
  if (!animalType) {
    throw new HttpException(404, 'Not found!');
  }
  const animalTypeTopics = await prisma.topic.findMany({
    where: { animalTypeId: animalTypeId },
    select: {
      id: true,
      title: true,
      description: true,
      animalTypeId: true,
    },
  });
  return animalTypeTopics;
};

const createTopic = async (
  animalTypeId: string,
  data: { title: string; description: string },
  role: string
) => {
  if (!data.title || !data.description) {
    throw new HttpException(400, 'Bad request!');
  }
  if (role != Role.ADMIN && role != Role.SUPER_ADMIN) {
    throw new HttpException(403, 'Forbidden.');
  }
  const topic = await prisma.topic.create({
    data: { title: data.title, description: data.description, animalTypeId: animalTypeId },
  });
  return topic;
};

const updateTopic = async (
  animalTypeId: string,
  id: string,
  data: { title: string; description: string },
  role: string
) => {
  const tempTopic = await prisma.topic.findFirst({ where: { id: id, animalTypeId } });
  if (!tempTopic) {
    throw new HttpException(404, 'Not found!');
  }
  if (role != Role.ADMIN && role != Role.SUPER_ADMIN) {
    throw new HttpException(403, 'Forbidden.');
  }
  const topic = await prisma.topic.update({
    where: { id: id },
    data: { title: data.title, description: data.description },
  });
  return topic;
};

const deleteTopic = async (animalTypeId: string, id: string, role: string) => {
  const tempTopic = await prisma.topic.findFirst({ where: { id: id, animalTypeId } });
  if (!tempTopic) {
    throw new HttpException(404, 'Not found!');
  }
  if (role != Role.ADMIN && role != Role.SUPER_ADMIN) {
    throw new HttpException(403, 'Forbidden.');
  }
  const topic = await prisma.topic.delete({
    where: { id: id },
  });
  // return topic;
};

export const topicService = {
  getTopics,
  getTopic,
  getAnimalTypeTopics,
  createTopic,
  updateTopic,
  deleteTopic,
};
