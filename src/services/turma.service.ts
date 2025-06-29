import { Turma } from "../entities";
import { prisma } from "../prisma/client";

class TurmaService {
  async create(turmaData: Omit<Turma, 'id'>) {
    return await prisma.turma.create({
      data: {
        ano: turmaData.ano,
        nome: turmaData.nome,
        cursoId: turmaData.cursoId
      }
    });
  }

  async findAll() {
    return await prisma.turma.findMany({
      include: { curso: true }
    });
  }

  async findById(id: number) {
    return await prisma.turma.findUnique({
      where: { id },
      include: {
        curso: true,
        matriculas: {
          include: { aluno: true }
        },
        turmaDisciplinas: {
          include: {
            disciplina: true,
            professor: true
          }
        }
      }
    });
  }

  async findByCurso(cursoId: number) {
    return await prisma.turma.findMany({
      where: { cursoId },
      include: { curso: true }
    });
  }

  async update(id: number, turmaData: Partial<Turma>) {
    return await prisma.turma.update({
      where: { id },
      data: {
        ano: turmaData.ano,
        nome: turmaData.nome,
        curso: turmaData.cursoId ? { connect: { id: turmaData.cursoId } } : undefined
      }
    });
  }

  async delete(id: number) {
    return await prisma.turma.delete({ where: { id } });
  }
}

export default new TurmaService();