import { TurmaDisciplina } from "../entities";
import { prisma } from "../prisma/client";

class TurmaDisciplinaService {
    async create(turmaDisciplinaData: Omit<TurmaDisciplina, 'id'>) {
        return await prisma.turmaDisciplina.create({
            data: {
                turma: {
                    connect: { id: turmaDisciplinaData.turma_id }
                },
                disciplina: {
                    connect: { id: turmaDisciplinaData.disciplina_id }
                },
                professor: {
                    connect: { id: turmaDisciplinaData.professor_id }
                }
            }
        });
    }

    async findAll() {
        return await prisma.turmaDisciplina.findMany({
            include: {
                turma: true,
                disciplina: true,
                professor: true
            }
        });
    }

    async findById(id: number) {
        return await prisma.turmaDisciplina.findUnique({
            where: { id },
            include: {
                turma: true,
                disciplina: true,
                professor: true,
                testes: true
            }
        });
    }

    async findByTurma(turmaId: number) {
        return await prisma.turmaDisciplina.findMany({
            where: { turmaId },
            include: {
                disciplina: true,
                professor: true
            }
        });
    }

    async update(id: number, turmaDisciplinaData: Partial<TurmaDisciplina>) {
        return await prisma.turmaDisciplina.update({
            where: { id },
            data: {
                turma: {
                    connect: { id: turmaDisciplinaData.turma_id }
                },
                disciplina: {
                    connect: { id: turmaDisciplinaData.disciplina_id }
                },
                professor: {
                    connect: { id: turmaDisciplinaData.professor_id }
                }
            }
        });
    }

    async delete(id: number) {
        return await prisma.turmaDisciplina.delete({ where: { id } });
    }
}

export default new TurmaDisciplinaService();