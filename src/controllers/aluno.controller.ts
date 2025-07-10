import { Request, Response } from 'express';
import alunoService from '../services/aluno.service';

class AlunoController {
  async create(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Acesso negado' });
      }
      
      console.log("Criar aluno");

      const aluno = await alunoService.create(req.body);
      res.status(201).json(aluno);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async completeProfile(req: Request, res: Response) {
    try {
      console.log("Completar o perfil do aluno");
      
      const result = await alunoService.completeProfile(req.body)
      res.status(200).json(result)
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {

      if (!req.user) {
        return res.status(401).json({ error: 'Acesso negado' });
      }

      console.log("Buscar todos");

      const alunos = await alunoService.findAll(req.user);
      res.json(alunos);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      console.log("Buscar pelo Id");

      if (!req.user) {
        return res.status(401).json({ error: 'Acesso negado' });
      }

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
      console.log("Atualizar");

      const aluno = await alunoService.update(Number(req.params.id), req.body);
      res.json(aluno);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Acesso negado' });
      }
      await alunoService.delete(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findByTurma(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Acesso negado' });
      }
      const alunos = await alunoService.findAlunosByTurma(Number(req.params.turmaId));
      res.json(alunos);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new AlunoController();