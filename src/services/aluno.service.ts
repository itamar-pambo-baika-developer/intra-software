import { Aluno } from "../entities";
import { prisma } from "../prisma/client";

class AlunoService {
  async create(alunoData: Omit<Aluno, 'id' | 'created_at'>) {
    return await prisma.aluno.create({ data: alunoData });
  }

  async findAll() {
    return await prisma.aluno.findMany();
  }

  async findById(id: number) {
    return await prisma.aluno.findUnique({ where: { id } });
  }

  async update(id: number, alunoData: Partial<Aluno>) {
    return await prisma.aluno.update({
      where: { id },
      data: alunoData
    });
  }

  async delete(id: number) {
    return await prisma.aluno.delete({ where: { id } });
  }

  async findAlunosByTurma(turmaId: number) {
    return await prisma.aluno.findMany({
      where: {
        matriculas: {
          some: { turmaId }
        }
      }
    });
  }
}

export default new AlunoService();