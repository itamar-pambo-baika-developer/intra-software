import { Disciplina } from "../entities";
import { prisma } from "../prisma/client";

class DisciplinaService {
  async create(disciplinaData: Omit<Disciplina, 'id'>) {
    return await prisma.disciplina.create({ data: disciplinaData });
  }

  async findAll() {
    return await prisma.disciplina.findMany();
  }

  async findById(id: number) {
    return await prisma.disciplina.findUnique({
      where: { id },
      include: { turmaDisciplinas: true }
    });
  }

  async update(id: number, disciplinaData: Partial<Disciplina>) {
    return await prisma.disciplina.update({
      where: { id },
      data: disciplinaData
    });
  }

  async delete(id: number) {
    return await prisma.disciplina.delete({ where: { id } });
  }
}

export default new DisciplinaService();