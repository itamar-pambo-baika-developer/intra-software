import { Pauta } from "../entities";
import { prisma } from "../prisma/client";

class PautaService {
  async create(pautaData: Omit<Pauta, 'id'>) {
    return await prisma.pauta.create({ data: {
        nota: pautaData.nota,
        observacoes: pautaData.observacoes,
        matricula: {
          connect: { id: pautaData.matricula_id }
        },
        teste: {
          connect: { id: pautaData.teste_id }
        }
    } });
  }

  async findAll() {
    return await prisma.pauta.findMany({
      include: {
        matricula: {
          include: { aluno: true }
        },
        teste: true
      }
    });
  }

  async findById(id: number) {
    return await prisma.pauta.findUnique({
      where: { id },
      include: {
        matricula: {
          include: { aluno: true }
        },
        teste: true
      }
    });
  }

  async findByTeste(testeId: number) {
    return await prisma.pauta.findMany({
      where: { testeId },
      include: {
        matricula: {
          include: { aluno: true }
        }
      }
    });
  }

  async findByMatricula(matriculaId: number) {
    return await prisma.pauta.findMany({
      where: { matriculaId },
      include: {
        teste: {
          include: {
            turmaDisciplina: {
              include: { disciplina: true }
            }
          }
        }
      }
    });
  }

  async update(id: number, pautaData: Partial<Pauta>) {
    return await prisma.pauta.update({
      where: { id },
      data: {
        nota: pautaData.nota,
        observacoes: pautaData.observacoes,
        matricula: {
          connect: { id: pautaData.matricula_id }
        },
        teste: {
          connect: { id: pautaData.teste_id }
        }
      }
    });
  }

  async delete(id: number) {
    return await prisma.pauta.delete({ where: { id } });
  }
}

export default new PautaService();