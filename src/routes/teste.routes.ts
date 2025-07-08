import { Router } from 'express';
import testeController from '../controllers/teste.controller';
import { MiddlewareAuthentication } from '../config/auth';

const router = Router();

// Cria um novo teste
router.post('/', MiddlewareAuthentication, testeController.create);

// Lista todos os testes
router.get('/', MiddlewareAuthentication, testeController.findAll);

// Obtém um teste específico por ID
router.get('/:id', MiddlewareAuthentication, testeController.findById);

// Lista testes por disciplina/turma
router.get('/disciplina/:turmaDisciplinaId', MiddlewareAuthentication, testeController.findByTurmaDisciplina);

// Atualiza um teste
router.put('/:id', MiddlewareAuthentication, testeController.update);

// Remove um teste
router.delete('/:id', MiddlewareAuthentication, testeController.delete);

export default router;