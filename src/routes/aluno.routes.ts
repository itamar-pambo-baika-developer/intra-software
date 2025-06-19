import { Router } from 'express';
import alunoController from '../controllers/aluno.controller';

const router = Router();

router.post('/', alunoController.create);
router.get('/', alunoController.findAll);
router.get('/:id', alunoController.findById);
router.put('/:id', alunoController.update);
router.delete('/:id', alunoController.delete);
router.get('/turma/:turmaId', alunoController.findByTurma);
router.put('/complete-profile', alunoController.completeProfile);

export default router;