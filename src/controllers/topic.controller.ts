import { topicService } from '../services/topic.service';
import { NextFunction, Request, Response } from 'express';

const getTopics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const topics = await topicService.getTopics(req.params.animalTypeId);
    res.status(200).send(topics);
  } catch (error) {
    next(error);
  }
};

const getTopic = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const topic = await topicService.getTopic(req.params.animalTypeId, req.params.id);
    res.status(200).send(topic);
  } catch (error) {
    next(error);
  }
};

const getAnimalTypeTopcis = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const animalTypeTopics = await topicService.getAnimalTypeTopics(req.params.animalTypeId);
    res.status(200).send(animalTypeTopics);
  } catch (error) {
    next(error);
  }
};

const createTopic = async (req: Request, res: Response, next: NextFunction) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({ message: 'Bad request!' });
  }
  try {
    const topic = await topicService.createTopic(req.params.animalTypeId, req.body);
    res.status(201).send(topic);
  } catch (error) {
    next(error);
  }
};

const updateTopic = async (req: Request, res: Response, next: NextFunction) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({ message: 'Bad request!' });
  }
  try {
    const topic = await topicService.updateTopic(req.params.animalTypeId, req.params.id, req.body);
    res.status(200).send(topic);
  } catch (error) {
    next(error);
  }
};

const deleteTopic = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const topic = await topicService.deleteTopic(req.params.animalTypeId, req.params.id);
    res.status(204).send(topic);
  } catch (error) {
    next(error);
  }
};

export const topicController = {
  getTopics,
  getTopic,
  getAnimalTypeTopcis,
  createTopic,
  updateTopic,
  deleteTopic,
};
