import { Router } from 'express';
import matriculaController from '../controllers/matricula.controller';
import { MiddlewareAuthentication } from '../config/auth';

const router = Router();

router.post('/', MiddlewareAuthentication, matriculaController.create);
router.get('/', MiddlewareAuthentication, matriculaController.findAll);
router.get('/:id', MiddlewareAuthentication, matriculaController.findById);
router.get('/aluno/:alunoId', MiddlewareAuthentication, matriculaController.findByAluno);
router.get('/turma/:turmaId', MiddlewareAuthentication, matriculaController.findByTurma);
router.delete('/:id', MiddlewareAuthentication, matriculaController.delete);

export default router;