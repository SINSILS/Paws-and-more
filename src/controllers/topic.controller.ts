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
    const topic = await topicService.getTopic(req.params.id);
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
  try {
    const topic = await topicService.createTopic(req.body);
    res.status(200).send(topic);
  } catch (error) {
    next(error);
  }
};

const updateTopic = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const topic = await topicService.updateTopic(req.body, req.params.id);
    res.status(200).send(topic);
  } catch (error) {
    next(error);
  }
};

const deleteTopic = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const topic = await topicService.deleteTopic(req.params.id);
    res.status(200).send(topic);
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
