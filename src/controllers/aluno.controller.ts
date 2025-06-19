import { Request, Response } from 'express';
import alunoService from '../services/aluno.service';

class AlunoController {
  async create(req: Request, res: Response) {
    try {
      const aluno = await alunoService.create(req.body);
      res.status(201).json(aluno);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async completeProfile(req: Request, res: Response) {
    try {
      const result = await alunoService.completeProfile(req.body)
      res.status(200).json(result)
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const alunos = await alunoService.findAll();
      res.json(alunos);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const aluno = await alunoService.findById(Number(req.params.id));
      if (aluno) {
        res.json(aluno);
      } else {
        res.status(404).json({ error: 'Aluno não encontrado' });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const aluno = await alunoService.update(Number(req.params.id), req.body);
      res.json(aluno);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await alunoService.delete(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findByTurma(req: Request, res: Response) {
    try {
      const alunos = await alunoService.findAlunosByTurma(Number(req.params.turmaId));
      res.json(alunos);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new AlunoController();