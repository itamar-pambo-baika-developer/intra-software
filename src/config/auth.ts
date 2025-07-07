import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const MiddlewareAuthentication = async (req: Request, res: Response, next: NextFunction) => {

  if (req.url.toString().includes("/api-docs")) {
    next()
    return
  }

  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    res.status(401).json({ error: 'Acesso negado' });
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string, email: string, role: string };

    req.user = { id: Number(decoded.id), email: decoded.email, role: decoded.role };

    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido', err });
  }
};