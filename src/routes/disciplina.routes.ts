import { Router } from 'express';
import disciplinaController from '../controllers/disciplina.controller';
import { MiddlewareAuthentication } from '../config/auth';

const router = Router();

router.post('/', MiddlewareAuthentication, disciplinaController.create);
router.get('/', MiddlewareAuthentication, disciplinaController.findAll);
router.get('/:id', MiddlewareAuthentication, disciplinaController.findById);
router.put('/:id', MiddlewareAuthentication, disciplinaController.update);
router.delete('/:id', MiddlewareAuthentication, disciplinaController.delete);

export default router;