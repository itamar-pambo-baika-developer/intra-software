import { Router } from 'express';
import disciplinaController from '../controllers/disciplina.controller';

const router = Router();

router.post('/', disciplinaController.create);
router.get('/', disciplinaController.findAll);
router.get('/:id', disciplinaController.findById);
router.put('/:id', disciplinaController.update);
router.delete('/:id', disciplinaController.delete);

export default router;