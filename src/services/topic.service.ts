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
    throw new HttpException(404, 'Topics not found');
  }
  return topics;
};

const getTopic = async (id: string) => {
  const topic = await prisma.topic.findUnique({ where: { id } });
  if (!topic) {
    throw new HttpException(404, 'Topic not found!');
  }
  return topic;
};

const createTopic = async (data: { title: string; description: string; animalTypeId: string }) => {
  const topic = await prisma.topic.create({
    data: { title: data.title, description: data.description, animalTypeId: data.animalTypeId },
  });
  return topic;
};

const updateTopic = async (data: { title: string; description: string }, id: string) => {
  const topic = await prisma.topic.update({
    where: { id: id },
    data: { title: data.title, description: data.description },
  });
  return topic;
};

const deleteTopic = async (id: string) => {
  const topic = await prisma.topic.delete({
    where: { id: id },
  });
  return topic;
};

export const topicService = {
  getTopics,
  getTopic,
  createTopic,
  updateTopic,
  deleteTopic,
};
