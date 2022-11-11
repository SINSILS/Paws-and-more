import { animalTypeService } from '../services/animalType.service';
import { NextFunction, Request, Response } from 'express';

const getAnimalTypes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const animalTypes = await animalTypeService.getAnimalTypes();
    res.status(200).send(animalTypes);
  } catch (error) {
    next(error);
  }
};

const getAnimalType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const animalTypes = await animalTypeService.getAnimalType(req.params.id);
    res.status(200).send(animalTypes);
  } catch (error) {
    next(error);
  }
};

const createAnimalType = async (req: Request, res: Response, next: NextFunction) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({ message: 'Bad request!' });
  }
  try {
    const role = req.tokenData.role;
    const animalType = await animalTypeService.createAnimalType(req.body, role);
    res.status(201).send(animalType);
  } catch (error) {
    next(error);
  }
};

const updateAnimalType = async (req: Request, res: Response, next: NextFunction) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({ message: 'Bad request!' });
  }
  try {
    const role = req.tokenData.role;
    const animalType = await animalTypeService.updateAnimalType(req.body, req.params.id, role);
    res.status(200).send(animalType);
  } catch (error) {
    next(error);
  }
};

const deleteAnimalType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const role = req.tokenData.role;
    const animalType = await animalTypeService.deleteAnimalType(req.params.id, role);
    res.status(204).send(animalType);
  } catch (error) {
    next(error);
  }
};

export const animalTypeController = {
  getAnimalTypes,
  getAnimalType,
  createAnimalType,
  updateAnimalType,
  deleteAnimalType,
};
