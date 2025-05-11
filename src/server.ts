import app from './app';
import dotenv from 'dotenv';
import { bootstrap } from './docs/swagger.docs';

dotenv.config();

const PORT = process.env.PORT || 3000;

bootstrap(app).listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação Swagger disponível em http://localhost:${PORT}/api-docs`);
});