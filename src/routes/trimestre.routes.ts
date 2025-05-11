import { Router } from 'express';
import trimestreController from '../controllers/trimestre.controller';

const router = Router();

// Cria um novo trimestre
router.post('/', trimestreController.create);

// Lista todos os trimestres
router.get('/', trimestreController.findAll);

// Obtém um trimestre específico por ID
router.get('/:id', trimestreController.findById);

// Lista trimestres por ano
router.get('/ano/:ano', trimestreController.findByAno);

// Atualiza um trimestre
router.put('/:id', trimestreController.update);

// Remove um trimestre
router.delete('/:id', trimestreController.delete);

export default router;