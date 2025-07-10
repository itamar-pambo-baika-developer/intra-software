import { Request, Response } from 'express';
import matriculaService from '../services/matricula.service';

class MatriculaController {
  async create(req: Request, res: Response) {
    try {
      if (!req.user || req.user.role !== 'admin') {
        return res.status(401).json({ error: 'Acesso negado' });
      }
      const matricula = await matriculaService.create(req.body);
      res.status(201).json(matricula);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Acesso negado' });
      }
      const matriculas = await matriculaService.findAll();
      res.json(matriculas);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const matricula = await matriculaService.findById(Number(req.params.id));
      if (matricula) {
        res.json(matricula);
      } else {
        res.status(404).json({ error: 'Matrícula não encontrada' });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findByAluno(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Acesso negado' });
      }
      const matriculas = await matriculaService.findByAluno(Number(req.params.alunoId));
      res.json(matriculas);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findByTurma(req: Request, res: Response) {
    if (!req.user) {
      return res.status(401).json({ error: 'Acesso negado' });
    }
    try {
      const matriculas = await matriculaService.findByTurma(Number(req.params.turmaId));
      res.json(matriculas);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      if (!req.user || req.user.role !== 'admin') {
        return res.status(401).json({ error: 'Acesso negado' });
      }
      await matriculaService.delete(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new MatriculaController();