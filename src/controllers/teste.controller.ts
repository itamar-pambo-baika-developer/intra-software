import { Request, Response } from 'express';
import testeService from '../services/teste.service';

class TesteController {
  async create(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Acesso negado' });
      }
      const teste = await testeService.create(req.body);
      res.status(201).json(teste);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Acesso negado' });
      }
      const testes = await testeService.findAll();
      res.json(testes);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Acesso negado' });
      }
      const teste = await testeService.findById(Number(req.params.id));
      if (teste) {
        res.json(teste);
      } else {
        res.status(404).json({ error: 'Teste não encontrado' });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findByTurmaDisciplina(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Acesso negado' });
      }
      const testes = await testeService.findByTurmaDisciplina(Number(req.params.turmaDisciplinaId));
      res.json(testes);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Acesso negado' });
      }
      const teste = await testeService.update(Number(req.params.id), req.body);
      res.json(teste);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Acesso negado' });
      }
      await testeService.delete(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new TesteController();