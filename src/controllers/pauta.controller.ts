import { Request, Response } from 'express';
import pautaService from '../services/pauta.service';

class PautaController {
  async create(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Acesso negado' });
      }
      const pauta = await pautaService.create(req.body);
      res.status(201).json(pauta);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Acesso negado' });
      }
      const pautas = await pautaService.findAll();
      res.json(pautas);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Acesso negado' });
      }
      const pauta = await pautaService.findById(Number(req.params.id));
      if (pauta) {
        res.json(pauta);
      } else {
        res.status(404).json({ error: 'Pauta não encontrada' });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findByTeste(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Acesso negado' });
      }
      const pautas = await pautaService.findByTeste(Number(req.params.testeId));
      res.json(pautas);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findByMatricula(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Acesso negado' });
      }
      const pautas = await pautaService.findByMatricula(Number(req.params.matriculaId));
      res.json(pautas);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      if (!req.user || req.user.role !== 'admin') {
        return res.status(401).json({ error: 'Acesso negado' });
      }
      const pauta = await pautaService.update(Number(req.params.id), req.body);
      res.json(pauta);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      if (!req.user || req.user.role !== 'admin') {
        return res.status(401).json({ error: 'Acesso negado' });
      }
      await pautaService.delete(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new PautaController();