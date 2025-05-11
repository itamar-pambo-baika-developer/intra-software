import { Router } from 'express';
import turmaController from '../controllers/turma.controller';

const router = Router();

router.post('/', turmaController.create);
router.get('/', turmaController.findAll);
router.get('/:id', turmaController.findById);
router.get('/curso/:cursoId', turmaController.findByCurso);
router.put('/:id', turmaController.update);
router.delete('/:id', turmaController.delete);

export default router;