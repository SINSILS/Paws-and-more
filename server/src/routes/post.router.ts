import { postController } from '../controllers/post.controller';
import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/posts', postController.getPosts);
router.get(
  '/animalTypes/:animalTypeId/topic/:ownerTopicId/post',
  authMiddleware,
  postController.getTopicPost
);
router.get(
  '/animalTypes/:animalTypeId/topic/:ownerTopicId/post/:id',
  authMiddleware,
  postController.getPost
);
router.post(
  '/animalTypes/:animalTypeId/topic/:ownerTopicId/post',
  authMiddleware,
  postController.createPost
);
router.put(
  '/animalTypes/:animalTypeId/topic/:ownerTopicId/post/:id',
  authMiddleware,
  postController.updatePost
);
router.delete(
  '/animalTypes/:animalTypeId/topic/:ownerTopicId/post/:id',
  authMiddleware,
  postController.deletePost
);

export const postRouter = router;
