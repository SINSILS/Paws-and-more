import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/users/me', authMiddleware, userController.getUserData);
router.get('/users/me/posts', authMiddleware, userController.getUserPosts);

export const userRouter = router;
