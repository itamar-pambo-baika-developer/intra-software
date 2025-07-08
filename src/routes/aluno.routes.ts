import { Router } from 'express';
import alunoController from '../controllers/aluno.controller';
import { MiddlewareAuthentication } from '../config/auth';

const router = Router();

router.post('/', MiddlewareAuthentication, alunoController.create);
router.get('/', MiddlewareAuthentication, alunoController.findAll);
router.get('/:id', MiddlewareAuthentication, alunoController.findById);
router.put('/:id', MiddlewareAuthentication, alunoController.update);
router.delete('/:id', MiddlewareAuthentication, alunoController.delete);
router.get('/turma/:turmaId', MiddlewareAuthentication, alunoController.findByTurma);
router.patch('/complete-profile', alunoController.completeProfile);

export default router;