import { Trimestre } from "../entities";
import { prisma } from "../prisma/client";

class TrimestreService {
  async create(trimestreData: Omit<Trimestre, 'id'>) {
    return await prisma.trimestre.create({ data: trimestreData });
  }

  async findAll() {
    return await prisma.trimestre.findMany();
  }

  async findById(id: number) {
    return await prisma.trimestre.findUnique({
      where: { id },
      include: { testes: true }
    });
  }

  async findByAno(ano: number) {
    return await prisma.trimestre.findMany({ where: { ano } });
  }

  async update(id: number, trimestreData: Partial<Trimestre>) {
    return await prisma.trimestre.update({
      where: { id },
      data: trimestreData
    });
  }

  async delete(id: number) {
    return await prisma.trimestre.delete({ where: { id } });
  }
}

export default new TrimestreService();