import axios from "axios";
import { Aluno, BilheteAPIRetorno } from "../entities";
import { prisma } from "../prisma/client";
import { StatusCodes } from "http-status-codes";

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
    const tests = await prisma.teste.findMany({
      where: {
        alunoId: id
      }
    });

    const colegas = await prisma.aluno.count({
      where: {
       matriculas: {
        some: {
          turma: {
            matriculas: {
              some: {
                alunoId: id
              }
            }
          }
        }
       }
      }
    }) - 1;

    const result = await prisma.aluno.findUnique({
      where: { id },
      include: {
        matriculas: {
          include: {
            turma: {
              include: {
                curso: true,
                turmaDisciplinas: {
                  include: {
                    disciplina: true,
                    professor: true
                  }
                }
              }
            },
          }
        },
      }
    });

    return {
      ...result,
      tests,
      colegas
    }
  }

  async update(id: number, alunoData: { nome?: string; email?: string; processNumber?: number }) {
    return await prisma.aluno.update({
      where: { id },
      data: alunoData
    });
  }

  async delete(studentId: number) {
    try {
      await prisma.$transaction(async (prisma) => {
        // Primeiro, deletar todas as pautas relacionadas às matrículas do aluno
        await prisma.pauta.deleteMany({
          where: {
            matricula: {
              alunoId: studentId
            }
          }
        });

        // Depois, deletar todas as matrículas do aluno
        await prisma.matricula.deleteMany({
          where: {
            alunoId: studentId
          }
        });

        // Buscar o aluno para obter o authId
        const student = await prisma.aluno.findUnique({
          where: { id: studentId }
        });

        // Deletar o aluno
        await prisma.aluno.delete({
          where: { id: studentId }
        });

        // Se o aluno tinha authId, deletar também a autorização
        if (student?.authId) {
          await prisma.authorization.delete({
            where: { id: student.authId }
          });
        }
      });

      return {
        error: false,
        message: 'Student deleted successfully',
        status: StatusCodes.OK,
        details: null,
      };
    } catch (error) {
      return {
        error: true,
        message: 'Failed to delete student',
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        details: error instanceof Error ? error.message : error,
      };
    }
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