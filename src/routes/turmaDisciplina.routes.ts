import { Router } from 'express';
import turmaDisciplinaController from '../controllers/turmaDisciplina.controller';
import { MiddlewareAuthentication } from '../config/auth';

const router = Router();

router.post('/', MiddlewareAuthentication, turmaDisciplinaController.create);
router.get('/', MiddlewareAuthentication, turmaDisciplinaController.findAll);
router.get('/:id', MiddlewareAuthentication, turmaDisciplinaController.findById);
router.get('/turma/:turmaId', MiddlewareAuthentication, turmaDisciplinaController.findByTurma);
router.put('/:id', MiddlewareAuthentication, turmaDisciplinaController.update);
router.delete('/:id', MiddlewareAuthentication, turmaDisciplinaController.delete);

export default router;