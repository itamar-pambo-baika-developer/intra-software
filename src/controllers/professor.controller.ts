import { Request, Response } from 'express';
import professorService from '../services/professor.service';

class ProfessorController {
  async create(req: Request, res: Response) {
    try {
      const professor = await professorService.create(req.body);
      res.status(201).json(professor);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const professores = await professorService.findAll();
      res.json(professores);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const professor = await professorService.findById(Number(req.params.id));
      if (professor) {
        res.json(professor);
      } else {
        res.status(404).json({ error: 'Professor não encontrado' });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const professor = await professorService.update(Number(req.params.id), req.body);
      res.json(professor);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await professorService.delete(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new ProfessorController();