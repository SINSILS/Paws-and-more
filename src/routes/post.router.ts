import { postController } from '../controllers/post.controller';
import { Router } from 'express';

const router = Router();

router.get('/animalTypes/:animalTypeId/topic/:ownerTopicId/posts', postController.getPosts);
router.get('/post/:id', postController.getPost);
router.post('/post', postController.createPost);
router.put('/post/:id', postController.updatePost);
router.delete('/post/:id', postController.deletePost);

export const postRouter = router;
