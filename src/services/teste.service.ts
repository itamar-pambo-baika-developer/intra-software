import { Teste } from "../entities";
import { prisma } from "../prisma/client";

class TesteService {
  async create(testeData: Omit<Teste, 'id'>) {
    return await prisma.teste.create({
      data: {
        turmaDisciplinaId: testeData.turma_disciplina_id,
        trimestreId: testeData.trimestre_id,
        tipo: testeData.tipo,
        data: testeData.data,
        peso: testeData.peso,
        alunoId: testeData.alunoId
      }
    });
  }

  async findAll() {
    return await prisma.teste.findMany({
      include: {
        turmaDisciplina: {
          include: {
            turma: true,
            disciplina: true
          }
        },
        trimestre: true
      }
    });
  }

  async findById(id: number) {
    return await prisma.teste.findUnique({
      where: { id },
      include: {
        turmaDisciplina: {
          include: {
            turma: true,
            disciplina: true,
            professor: true
          }
        },
        trimestre: true,
        pautas: {
          include: {
            matricula: {
              include: { aluno: true }
            }
          }
        }
      }
    });
  }

  async findByTurmaDisciplina(turmaDisciplinaId: number) {
    return await prisma.teste.findMany({
      where: { turmaDisciplinaId },
      include: {
        trimestre: true,
        pautas: true
      }
    });
  }

  async update(id: number, testeData: Partial<Teste>) {
    return await prisma.teste.update({
      where: { id },
      data: {
        turmaDisciplina: {
          connect: { id: testeData.turma_disciplina?.disciplina_id }
        },
        trimestre: {
          connect: { id: testeData.trimestre?.id }
        },
        tipo: testeData.tipo,
        data: testeData.data,
        peso: testeData.peso
      }
    });
  }

  async delete(id: number) {
    return await prisma.teste.delete({ where: { id } });
  }
}

export default new TesteService();