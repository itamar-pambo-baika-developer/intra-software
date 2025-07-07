import express from 'express';
import cors from 'cors';
import routes from './routes';
import 'express';

declare module 'express' {
  interface Request {
    user?: {
      id: number;
      email: string;
      role: string;
    };
  }
};

const app = express();

app.use(cors());
app.use(express.json());

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erro interno do servidor' });
});

app.use(routes);

export default app;