import { Request, Response } from 'express';
import turmaDisciplinaService from '../services/turmaDisciplina.service';

class TurmaDisciplinaController {
  async create(req: Request, res: Response) {
    try {
      const turmaDisciplina = await turmaDisciplinaService.create(req.body);
      res.status(201).json(turmaDisciplina);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const turmaDisciplinas = await turmaDisciplinaService.findAll();
      res.json(turmaDisciplinas);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const turmaDisciplina = await turmaDisciplinaService.findById(Number(req.params.id));
      if (turmaDisciplina) {
        res.json(turmaDisciplina);
      } else {
        res.status(404).json({ error: 'TurmaDisciplina não encontrada' });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findByTurma(req: Request, res: Response) {
    try {
      const turmaDisciplinas = await turmaDisciplinaService.findByTurma(Number(req.params.turmaId));
      res.json(turmaDisciplinas);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const turmaDisciplina = await turmaDisciplinaService.update(
        Number(req.params.id),
        req.body
      );
      res.json(turmaDisciplina);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await turmaDisciplinaService.delete(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new TurmaDisciplinaController();