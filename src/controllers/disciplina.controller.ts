import { Request, Response } from 'express';
import disciplinaService from '../services/disciplina.service';

class DisciplinaController {
  async create(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Acesso negado' });
      }
      const disciplina = await disciplinaService.create(req.body);
      res.status(201).json(disciplina);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Acesso negado' });
      }
      const disciplinas = await disciplinaService.findAll();
      res.json(disciplinas);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    if (!req.user) {
      return res.status(401).json({ error: 'Acesso negado' });
    }
    try {
      const disciplina = await disciplinaService.findById(Number(req.params.id));
      if (disciplina) {
        res.json(disciplina);
      } else {
        res.status(404).json({ error: 'Disciplina não encontrada' });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      if (!req.user || req.user.role !== 'admin') {
        return res.status(401).json({ error: 'Acesso negado' });
      }
      const disciplina = await disciplinaService.update(Number(req.params.id), req.body);
      res.json(disciplina);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    if(!req.user || req.user.role !== 'admin') {
      return res.status(401).json({ error: 'Acesso negado' });
    }
    try {
      await disciplinaService.delete(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new DisciplinaController();