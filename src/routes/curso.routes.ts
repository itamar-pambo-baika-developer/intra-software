import { Router } from 'express';
import cursoController from '../controllers/curso.controller';

const router = Router();

router.post('/', cursoController.create);
router.get('/', cursoController.findAll);
router.get('/:id', cursoController.findById);
router.put('/:id', cursoController.update);
router.delete('/:id', cursoController.delete);

export default router;