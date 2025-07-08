import { Router } from 'express';
import turmaController from '../controllers/turma.controller';
import { MiddlewareAuthentication } from '../config/auth';

const router = Router();

router.post('/', MiddlewareAuthentication, turmaController.create);
router.get('/', MiddlewareAuthentication, turmaController.findAll);
router.get('/:id', MiddlewareAuthentication, turmaController.findById);
router.get('/curso/:cursoId', MiddlewareAuthentication, turmaController.findByCurso);
router.put('/:id', MiddlewareAuthentication, turmaController.update);
router.delete('/:id', MiddlewareAuthentication, turmaController.delete);

export default router;