import axios from "axios";
import { Aluno, BilheteAPIRetorno } from "../entities";
import { prisma } from "../prisma/client";

class AlunoService {
  async create(alunoData: { email: string; processNumber: number }) {
    return await prisma.aluno.create({
      data: {
        email: alunoData.email,
        processNumber: alunoData.processNumber
      }
    });
  }

  async completeProfile(data: { biNumber: string; email: string }) {
    const BiAPIConsult = await axios.get<BilheteAPIRetorno>(`https://consulta.edgarsingui.ao/consultar/${data.biNumber}`);

    if (BiAPIConsult.data.error) {
      return BiAPIConsult.data;
    }

    await prisma.aluno.update({
      where: {
        email: data.email
      },
      data: {
        nome: BiAPIConsult.data.name,
        birthDate: BiAPIConsult.data.data_de_nascimento
      }
    })
  }

  async findAll() {
    return await prisma.aluno.findMany();
  }

  async findById(id: number) {
    return await prisma.aluno.findUnique({ where: { id } });
  }

  async update(id: number, alunoData: { nome?: string; email?: string; processNumber?: number }) {
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