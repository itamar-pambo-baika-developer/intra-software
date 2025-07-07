import { Request, Response } from 'express';
import trimestreService from '../services/trimestre.service';

class TrimestreController {
  async create(req: Request, res: Response) {
    try {
      if (!req.user || req.user.role !== 'admin') {
        return res.status(401).json({ error: 'Acesso negado' });
      }
      const trimestre = await trimestreService.create(req.body);
      res.status(201).json(trimestre);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      if (!req.user ) {
        return res.status(401).json({ error: 'Acesso negado' });
      }
      const trimestres = await trimestreService.findAll();
      res.json(trimestres);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Acesso negado' });
      }
      const trimestre = await trimestreService.findById(Number(req.params.id));
      if (trimestre) {
        res.json(trimestre);
      } else {
        res.status(404).json({ error: 'Trimestre não encontrado' });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findByAno(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Acesso negado' });
      }
      const trimestres = await trimestreService.findByAno(Number(req.params.ano));
      res.json(trimestres);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      if (!req.user || req.user.role !== 'admin') {
        return res.status(401).json({ error: 'Acesso negado' });
      }
      const trimestre = await trimestreService.update(Number(req.params.id), req.body);
      res.json(trimestre);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      if (!req.user || req.user.role !== 'admin') {
        return res.status(401).json({ error: 'Acesso negado' });
      }
      await trimestreService.delete(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new TrimestreController();