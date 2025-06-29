import { mailTransporter } from "../config/mailer";
import { SendMailOptions } from "nodemailer";

interface MailPayload {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export class MailService {
  static async sendMail({ to, subject, text, html }: MailPayload): Promise<void> {
    const mailOptions: SendMailOptions = {
      from: `"Intra Software" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    };

    try {
      await mailTransporter.sendMail(mailOptions);
      console.log(`📧 E-mail enviado com sucesso para ${to}`);
    } catch (error) {
      console.error("❌ Erro ao enviar e-mail:", error);
      throw new Error("Falha ao enviar o e-mail");
    }
  }
}
