import fs from 'fs';
import { OpenAI } from 'openai';
import { PrismaClient } from '@prisma/client';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function preencherPlanilhaComGPT(turmaId: number, planilhaPath: string, prisma: PrismaClient) {
  // Carregar dados reais da BD
  const turma = await prisma.turma.findUnique({
    where: { id: turmaId },
    include: {
      curso: true,
      matriculas: {
        include: {
          aluno: true,
          pautas: {
            include: {
              teste: {
                include: {
                  turmaDisciplina: {
                    include: { disciplina: true }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  if (!turma) throw new Error('Turma não encontrada.');

  const dadosGPT = turma.matriculas.map((matricula, index) => ({
    numero: index + 1,
    nome: matricula.aluno.nome,
    disciplinas: matricula.pautas.map(p => ({
      disciplina: p.teste.turmaDisciplina.disciplina.nome,
      nota: p.nota
    }))
  }));

  // 1. Enviar ficheiro para OpenAI
  const fileUpload = await openai.files.create({
    file: fs.createReadStream(planilhaPath),
    purpose: 'assistants'
  });

  // 2. Criar um assistant (podes criar uma vez e reutilizar depois com ID fixo)
  const assistant = await openai.beta.assistants.create({
    name: 'Preenchedor de Planilhas',
    instructions: 'Preenche a planilha Excel com os dados reais recebidos em JSON.',
    tools: [{ type: 'file_search' }],
    model: 'gpt-4o'
  });

  // 3. Criar thread
  const thread = await openai.beta.threads.create();

  // 4. Adicionar mensagem com dados e referência ao ficheiro
  await openai.beta.threads.messages.create({
    thread_id: thread.id,
    role: 'user',
    content: `Recebeste uma planilha com estrutura base. Preenche a partir do ficheiro anexado com os dados reais abaixo. Número do aluno na coluna B, nome na C e notas a partir da D.\n\n${JSON.stringify(dadosGPT, null, 2)}`,
    file_ids: [fileUpload.id]
  } as any);

  // 5. Executar o assistant
  const run = await openai.beta.threads.runs.create({
    thread_id: thread.id,
    assistant_id: assistant.id
  });

  // 6. Aguardar resposta do assistant
  let runStatus;
  do {
    runStatus = await openai.beta.threads.runs.retrieve({
      thread_id: thread.id,
      run_id: run.id
    });
    await new Promise(r => setTimeout(r, 1000));
  } while (runStatus.status !== 'completed');

  // 7. Obter mensagens de resposta
  const messages = await openai.beta.threads.messages.list({ thread_id: thread.id });
  const resposta = messages.data[0].content?.[0]?.text?.value;

  console.log('Resposta do GPT:', resposta);

  return resposta;
}