import axios from "axios";
import { Aluno, BilheteAPIRetorno } from "../entities";
import { prisma } from "../prisma/client";

class AlunoService {
  async create(alunoData: { email: string; processNumber: number }) {
    const alunoAlreadyExists = await prisma.aluno.findUnique({
      where: { email: alunoData.email }
    });

    if (alunoAlreadyExists) {
      return { error: true, message: "Aluno já existe" };
    }

    const teacherAlreadyExists = await prisma.professor.findUnique({
      where: { email: alunoData.email }
    });

    if (teacherAlreadyExists) {
      return { error: true, message: "Este email já está em uso" };
    }

    return await prisma.aluno.create({
      data: {
        email: alunoData.email,
        processNumber: alunoData.processNumber
      }
    });
  }

  async completeProfile(data: { biNumber: string; email: string }) {
    console.log(data);
    const BiAPIConsult = await axios.get<BilheteAPIRetorno>(`https://consulta.edgarsingui.ao/consultar/${data.biNumber}`);

    console.log(BiAPIConsult.data);

    if (BiAPIConsult.data.error) {
      console.log({ error: true, message: "Não foi possível encontrar o número de bi" });
      return BiAPIConsult.data;
    }

    const studentExists = await prisma.aluno.findUnique({
      where: {
        email: data.email
      }
    });

    if (!studentExists) {
      console.log("Aluno não encontrado...");

      return { error: true, message: "Email não encontrado" };
    }

    console.log("Bi encontrado, Atualizando aluno...");
    try {

      await prisma.aluno.update({
        where: {
          email: data.email
        },
        data: {
          nome: BiAPIConsult.data.name,
          birthDate: new Date(BiAPIConsult.data.data_de_nascimento)
        }
      })

      return { error: false, message: "Aluno atualizado com sucesso" };
    } catch (error) {
      console.log(error);
      return { error: true, message: "Não foi possível atualizar o aluno" };
    }
  }

  async findAll(user: { id: number, role: string, email: string }) {
    if (user.role === "teacher") {
      return await prisma.aluno.findMany({
        where: {
          matriculas: {
            some: {
              turma: {
                turmaDisciplinas: {
                  some: {
                    professorId: user.id
                  }
                }
              }
            }
          }
        }
      });
    }

    if (user.role === "admin") {
      return await prisma.aluno.findMany();
    }

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