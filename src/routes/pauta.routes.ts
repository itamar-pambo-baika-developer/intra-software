import { Router } from 'express';
import pautaController from '../controllers/pauta.controller';
import { MiddlewareAuthentication } from '../config/auth';

const router = Router();

// Lança uma nova nota na pauta
router.post('/', MiddlewareAuthentication, pautaController.create);

// Lista todas as notas
router.get('/', MiddlewareAuthentication, pautaController.findAll);

// Obtém uma nota específica por ID
router.get('/:id', MiddlewareAuthentication, pautaController.findById);

// Lista notas por teste
router.get('/teste/:testeId', MiddlewareAuthentication, pautaController.findByTeste);

// Lista notas por matrícula (aluno)
router.get('/matricula/:matriculaId', MiddlewareAuthentication, pautaController.findByMatricula);

// Atualiza uma nota
router.put('/:id', MiddlewareAuthentication, pautaController.update);

// Remove uma nota
router.delete('/:id', MiddlewareAuthentication, pautaController.delete);

export default router;