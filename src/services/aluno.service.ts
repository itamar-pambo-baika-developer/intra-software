import axios from "axios";
import { Aluno, AlunoCompleteOPerfil, BilheteAPIRetorno } from "../entities";
import { prisma } from "../prisma/client";

class AlunoService {
  async create(alunoData: Omit<Aluno, 'id' | 'created_at'>) {
    return await prisma.aluno.create({
      data: {
        email: alunoData.email,
        processNumber: alunoData.numero_de_processo
      }
    });
  }

  async completeProfile(data: AlunoCompleteOPerfil) {
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