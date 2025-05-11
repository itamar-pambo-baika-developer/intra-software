import { Router } from 'express';
import pautaController from '../controllers/pauta.controller';

const router = Router();

// Lança uma nova nota na pauta
router.post('/', pautaController.create);

// Lista todas as notas
router.get('/', pautaController.findAll);

// Obtém uma nota específica por ID
router.get('/:id', pautaController.findById);

// Lista notas por teste
router.get('/teste/:testeId', pautaController.findByTeste);

// Lista notas por matrícula (aluno)
router.get('/matricula/:matriculaId', pautaController.findByMatricula);

// Atualiza uma nota
router.put('/:id', pautaController.update);

// Remove uma nota
router.delete('/:id', pautaController.delete);

export default router;