import express from 'express';
import { AuthController } from '../controllers/auth.controller';

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post('/login', (req, res) => authController.login(req, res));

authRouter.post('/register', (req, res) => authController.register(req, res));

authRouter.post('/change-password', (req, res) => authController.changePassword(req, res));

export default authRouter;