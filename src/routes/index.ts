import { Router } from 'express';
import alunoRouter from './aluno.routes';
import cursoRouter from './curso.routes';
import disciplinaRouter from './disciplina.routes';
import matriculaRouter from './matricula.routes';
import professorRouter from './professor.routes';
import turmaRouter from './turma.routes';
import turmaDisciplinaRouter from './turmaDisciplina.routes';
import trimestreRouter from './trimestre.routes';
import testeRouter from './teste.routes';
import pautaRouter from './pauta.routes';
import authRouter from './auth.routes';

const router = Router();

router.use('/alunos', alunoRouter);
router.use('/cursos', cursoRouter);
router.use('/disciplinas', disciplinaRouter);
router.use('/matriculas', matriculaRouter);
router.use('/professores', professorRouter);
router.use('/turmas', turmaRouter);
router.use('/turma-disciplinas', turmaDisciplinaRouter);
router.use('/trimestres', trimestreRouter);
router.use('/testes', testeRouter);
router.use('/pautas', pautaRouter);
router.use('/auth', authRouter); 

export default router;