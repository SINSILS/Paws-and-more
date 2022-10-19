import { topicController } from '../controllers/topic.controller';
import { Router } from 'express';

const router = Router();

router.get('/animalTypes/:animalTypeId/topic', topicController.getTopics);
router.get('/topic/:id', topicController.getTopic);
router.post('/topic', topicController.createTopic);
router.put('/topic/:id', topicController.updateTopic);
router.delete('/topic/:id', topicController.deleteTopic);

export const topicRouter = router;
