import { Request, Response } from 'express';
import cursoService from '../services/curso.service';

class CursoController {
  async create(req: Request, res: Response) {
    try {
      const curso = await cursoService.create(req.body);
      res.status(201).json(curso);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const cursos = await cursoService.findAll();
      res.json(cursos);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const curso = await cursoService.findById(Number(req.params.id));
      if (curso) {
        res.json(curso);
      } else {
        res.status(404).json({ error: 'Curso não encontrado' });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const curso = await cursoService.update(Number(req.params.id), req.body);
      res.json(curso);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await cursoService.delete(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new CursoController();