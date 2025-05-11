import { Router } from 'express';
import professorController from '../controllers/professor.controller';

const router = Router();

router.post('/', professorController.create);
router.get('/', professorController.findAll);
router.get('/:id', professorController.findById);
router.put('/:id', professorController.update);
router.delete('/:id', professorController.delete);

export default router;