import { animalTypeController } from '../controllers/animalType.controller';
import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/animalTypes', authMiddleware, animalTypeController.getAnimalTypes);
router.get('/animalTypes/:id', authMiddleware, animalTypeController.getAnimalType);
router.post('/animalTypes', authMiddleware, animalTypeController.createAnimalType);
router.put('/animalTypes/:id', authMiddleware, animalTypeController.updateAnimalType);
router.delete('/animalTypes/:id', authMiddleware, animalTypeController.deleteAnimalType);

export const animalTypeRouter = router;
