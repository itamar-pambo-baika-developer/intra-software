import { Router } from 'express';
import cursoController from '../controllers/curso.controller';
import { MiddlewareAuthentication } from '../config/auth';

const router = Router();

router.post('/', MiddlewareAuthentication, cursoController.create);
router.get('/', MiddlewareAuthentication, cursoController.findAll);
router.get('/:id', MiddlewareAuthentication, cursoController.findById);
router.put('/:id', MiddlewareAuthentication, cursoController.update);
router.delete('/:id', MiddlewareAuthentication, cursoController.delete);

export default router;