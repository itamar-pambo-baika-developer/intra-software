import { Professor } from "../entities";
import { prisma } from "../prisma/client";

class ProfessorService {
  async create(professorData: Omit<Professor, 'id' | 'created_at'>) {
    return await prisma.professor.create({ data: professorData });
  }

  async findAll() {
    return await prisma.professor.findMany();
  }

  async findById(id: number) {
    return await prisma.professor.findUnique({
      where: { id },
      include: { turmaDisciplinas: true }
    });
  }

  async update(id: number, professorData: Partial<Professor>) {
    return await prisma.professor.update({
      where: { id },
      data: professorData
    });
  }

  async delete(id: number) {
    return await prisma.professor.delete({ where: { id } });
  }
}

export default new ProfessorService();