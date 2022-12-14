import { Router } from 'express';
import { authController } from '../controllers/auth.controller';

const router = Router();

router.post('/auth/register', authController.register);
router.post(`/auth/login`, authController.login);

export const authRouter = router;
