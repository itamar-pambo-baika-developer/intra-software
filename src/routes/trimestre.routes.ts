import { Router } from 'express';
import trimestreController from '../controllers/trimestre.controller';
import { MiddlewareAuthentication } from '../config/auth';

const router = Router();

// Cria um novo trimestre
router.post('/', MiddlewareAuthentication, trimestreController.create);

// Lista todos os trimestres
router.get('/', MiddlewareAuthentication, trimestreController.findAll);

// Obtém um trimestre específico por ID
router.get('/:id', MiddlewareAuthentication, trimestreController.findById);

// Lista trimestres por ano
router.get('/ano/:ano', MiddlewareAuthentication, trimestreController.findByAno);

// Atualiza um trimestre
router.put('/:id', MiddlewareAuthentication, trimestreController.update);

// Remove um trimestre
router.delete('/:id', MiddlewareAuthentication, trimestreController.delete);

export default router;