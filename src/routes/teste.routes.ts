import { Router } from 'express';
import testeController from '../controllers/teste.controller';

const router = Router();

// Cria um novo teste
router.post('/', testeController.create);

// Lista todos os testes
router.get('/', testeController.findAll);

// Obtém um teste específico por ID
router.get('/:id', testeController.findById);

// Lista testes por disciplina/turma
router.get('/disciplina/:turmaDisciplinaId', testeController.findByTurmaDisciplina);

// Atualiza um teste
router.put('/:id', testeController.update);

// Remove um teste
router.delete('/:id', testeController.delete);

export default router;