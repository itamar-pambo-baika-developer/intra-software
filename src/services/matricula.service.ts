import { Matricula } from "../entities";
import { prisma } from "../prisma/client";

class MatriculaService {
    async create(matriculaData: Omit<Matricula, 'id' | 'data_matricula'>) {
        return await prisma.matricula.create({
            data: {
                aluno: {
                    connect: { id: matriculaData.aluno_id }
                },
                turma: {
                    connect: { id: matriculaData.turma_id }
                },
            }
        });
    }

    async findAll() {
        return await prisma.matricula.findMany({
            include: {
                aluno: true,
                turma: true
            }
        });
    }

    async findById(id: number) {
        return await prisma.matricula.findUnique({
            where: { id },
            include: {
                aluno: true,
                turma: true,
                pautas: true
            }
        });
    }

    async findByAluno(alunoId: number) {
        return await prisma.matricula.findMany({
            where: { alunoId },
            include: {
                turma: {
                    include: { curso: true }
                }
            }
        });
    }

    async findByTurma(turmaId: number) {
        return await prisma.matricula.findMany({
            where: { turmaId },
            include: { aluno: true }
        });
    }

    async delete(id: number) {
        return await prisma.matricula.delete({ where: { id } });
    }
}

export default new MatriculaService();