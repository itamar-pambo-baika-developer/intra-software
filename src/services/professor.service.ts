import { BilheteAPIRetorno, Professor } from "../entities";
import { prisma } from "../prisma/client";
import jwt from 'jsonwebtoken';
import { MailService } from "./MailService";

class ProfessorService {
  async create(professorData: { biNumber: string; email: string; url: string }) {
    const BiAPIConsult = await axios.get<BilheteAPIRetorno>(`https://consulta.edgarsingui.ao/consultar/${professorData.biNumber}`);

    if (BiAPIConsult.data.error) {
      return BiAPIConsult.data;
    }

    const teacher = await prisma.professor.create({
      data: {
        email: professorData.email,
        nome: BiAPIConsult.data.name,
      }
    });

    const token = jwt.sign({
      id: teacher.id
    },
      process.env.SECRET_KEY ?? '', {
      expiresIn: '1d'
    });

    await MailService.sendMail({
      to: professorData.email,
      subject: "Bem-vindo ao Intra Software",
      text: "Olá! Este é um e-mail de teste enviado pelo nosso serviço.",
      html: `<h1>Crie suas credenciais no Intra como professor!</h1><p>Sr(a) ${BiAPIConsult.data.name}, use este link para se autenticar ${professorData.url + token}.</p>`,
    });
  }

  async findAll() {
    return await prisma.professor.findMany();
  }

  async findById(id: number) {
    return await prisma.professor.findUnique({
      where: { id },
      include: { turmaDisciplinas: true }
    });
  }

  async update(id: number, professorData: Partial<Professor>) {
    return await prisma.professor.update({
      where: { id },
      data: professorData
    });
  }

  async delete(id: number) {
    return await prisma.professor.delete({ where: { id } });
  }
}

export default new ProfessorService();