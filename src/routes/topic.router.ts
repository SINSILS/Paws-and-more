import { topicController } from '../controllers/topic.controller';
import { Router } from 'express';

const router = Router();

router.get('/topic', topicController.getTopics);
router.get('/animalTypes/:animalTypeId/topic', topicController.getAnimalTypeTopcis);
router.get('/animalTypes/:animalTypeId/topic/:id', topicController.getTopic);
router.post('/animalTypes/:animalTypeId/topic', topicController.createTopic);
router.put('/animalTypes/:animalTypeId/topic/:id', topicController.updateTopic);
router.delete('/animalTypes/:animalTypeId/topic/:id', topicController.deleteTopic);

export const topicRouter = router;
