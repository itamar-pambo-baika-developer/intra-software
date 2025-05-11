import { Curso } from "../entities";
import { prisma } from "../prisma/client";

class CursoService {
  async create(cursoData: Omit<Curso, 'id' | 'created_at'>) {
    return await prisma.curso.create({ data: cursoData });
  }

  async findAll() {
    return await prisma.curso.findMany();
  }

  async findById(id: number) {
    return await prisma.curso.findUnique({ 
      where: { id },
      include: { turmas: true }
    });
  }

  async update(id: number, cursoData: Partial<Curso>) {
    return await prisma.curso.update({
      where: { id },
      data: cursoData
    });
  }

  async delete(id: number) {
    return await prisma.curso.delete({ where: { id } });
  }
}

export default new CursoService();