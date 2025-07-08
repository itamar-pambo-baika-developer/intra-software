import { Router } from 'express';
import professorController from '../controllers/professor.controller';
import { MiddlewareAuthentication } from '../config/auth';

const router = Router();

router.post('/', MiddlewareAuthentication, professorController.create);
router.get('/', MiddlewareAuthentication, professorController.findAll);
router.get('/:id', MiddlewareAuthentication, professorController.findById);
router.put('/:id', MiddlewareAuthentication, professorController.update);
router.delete('/:id', MiddlewareAuthentication, professorController.delete);

export default router;