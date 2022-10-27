import { prisma } from '../config/prisma';
import { HttpException } from '../exceptions/httpException';

const getAnimalTypes = async () => {
  const animalTypes = await prisma.animalType.findMany({
    select: {
      id: true,
      name: true,
      description: true,
    },
  });

  if (!animalTypes) {
    throw new HttpException(404, 'Not found');
  }
  return animalTypes;
};

const getAnimalType = async (id: string) => {
  const animalType = await prisma.animalType.findUnique({ where: { id } });
  if (!animalType) {
    throw new HttpException(404, 'Not found!');
  }
  return animalType;
};

const createAnimalType = async (data: { name: string; description: string }) => {
  if (data.name == null || data.description == null) {
    throw new HttpException(400, 'Bad request!');
  }
  const animalType = await prisma.animalType.create({
    data: { name: data.name, description: data.description },
  });
  return animalType;
};

const updateAnimalType = async (data: { name: string; description: string }, id: string) => {
  const temp = await prisma.animalType.findUnique({ where: { id } });
  if (!temp) {
    throw new HttpException(404, 'Not found!');
  }
  const animalType = await prisma.animalType.update({
    where: { id: id },
    data: { name: data.name, description: data.description },
  });
  return animalType;
};

const deleteAnimalType = async (id: string) => {
  const temp = await prisma.animalType.findUnique({ where: { id } });
  if (!temp) {
    throw new HttpException(404, 'Not found!');
  }
  const animalType = await prisma.animalType.delete({
    where: { id: id },
  });
  // return animalType;
};

export const animalTypeService = {
  getAnimalTypes,
  getAnimalType,
  createAnimalType,
  updateAnimalType,
  deleteAnimalType,
};
