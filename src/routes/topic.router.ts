import { topicController } from '../controllers/topic.controller';
import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/topic', authMiddleware, topicController.getTopics);
router.get('/animalTypes/:animalTypeId/topic', authMiddleware, topicController.getAnimalTypeTopcis);
router.get('/animalTypes/:animalTypeId/topic/:id', authMiddleware, topicController.getTopic);
router.post('/animalTypes/:animalTypeId/topic', authMiddleware, topicController.createTopic);
router.put('/animalTypes/:animalTypeId/topic/:id', authMiddleware, topicController.updateTopic);
router.delete('/animalTypes/:animalTypeId/topic/:id', authMiddleware, topicController.deleteTopic);

export const topicRouter = router;
