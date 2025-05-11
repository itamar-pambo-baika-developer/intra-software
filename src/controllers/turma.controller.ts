import { Request, Response } from 'express';
import turmaService from '../services/turma.service';

class TurmaController {
  async create(req: Request, res: Response) {
    try {
      const turma = await turmaService.create(req.body);
      res.status(201).json(turma);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const turmas = await turmaService.findAll();
      res.json(turmas);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const turma = await turmaService.findById(Number(req.params.id));
      if (turma) {
        res.json(turma);
      } else {
        res.status(404).json({ error: 'Turma não encontrada' });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findByCurso(req: Request, res: Response) {
    try {
      const turmas = await turmaService.findByCurso(Number(req.params.cursoId));
      res.json(turmas);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const turma = await turmaService.update(Number(req.params.id), req.body);
      res.json(turma);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await turmaService.delete(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new TurmaController();