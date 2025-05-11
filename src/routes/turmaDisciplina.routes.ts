import { Router } from 'express';
import turmaDisciplinaController from '../controllers/turmaDisciplina.controller';

const router = Router();

router.post('/', turmaDisciplinaController.create);
router.get('/', turmaDisciplinaController.findAll);
router.get('/:id', turmaDisciplinaController.findById);
router.get('/turma/:turmaId', turmaDisciplinaController.findByTurma);
router.put('/:id', turmaDisciplinaController.update);
router.delete('/:id', turmaDisciplinaController.delete);

export default router;