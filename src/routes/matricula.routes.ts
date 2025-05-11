import { Router } from 'express';
import matriculaController from '../controllers/matricula.controller';

const router = Router();

router.post('/', matriculaController.create);
router.get('/', matriculaController.findAll);
router.get('/:id', matriculaController.findById);
router.get('/aluno/:alunoId', matriculaController.findByAluno);
router.get('/turma/:turmaId', matriculaController.findByTurma);
router.delete('/:id', matriculaController.delete);

export default router;