import { postController } from '../controllers/post.controller';
import { Router } from 'express';

const router = Router();

router.get('/posts', postController.getPosts);
router.get('/animalTypes/:animalTypeId/topic/:ownerTopicId/post', postController.getTopicPost);
router.get('/animalTypes/:animalTypeId/topic/:ownerTopicId/post/:id', postController.getPost);
router.post('/animalTypes/:animalTypeId/topic/:ownerTopicId/post', postController.createPost);
router.put('/animalTypes/:animalTypeId/topic/:ownerTopicId/post/:id', postController.updatePost);
router.delete('/animalTypes/:animalTypeId/topic/:ownerTopicId/post/:id', postController.deletePost);

export const postRouter = router;
