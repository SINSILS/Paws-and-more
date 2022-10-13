import { animalTypeController } from '../controllers/animalType.controller';
import { Router } from 'express';

const router = Router();

router.get('/animalTypes', animalTypeController.getAnimalTypes);
router.get('/animalTypes/:id', animalTypeController.getAnimalType);
router.post('/animalTypes', animalTypeController.createAnimalType);
router.put('/animalTypes/:id', animalTypeController.updateAnimalType);
router.delete('/animalTypes/:id', animalTypeController.deleteAnimalType);

export const animalTypeRouter = router;
