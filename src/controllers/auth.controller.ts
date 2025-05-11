import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          error: true,
          message: 'Email and password are required',
          details: null
        });
      }

      const result = await this.authService.login(email, password);

      if (result.error) {
        return res.status(result.status).json({
          error: result.error,
          message: result.message,
          details: result.details
        });
      }

      return res.status(result.status).json({
        token: result.data?.token,
        message: result.message
      });

    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({
        error: true,
        message: 'Internal server error',
        details: error instanceof Error ? error.message : null
      });
    } finally {
      await this.authService.disconnect();
    }
  }

  async register(req: Request, res: Response) {
    try {
      const { email, password, role } = req.body;

      if (!email || !password || !role) {
        return res.status(400).json({
          error: true,
          message: 'Email, password and role are required',
          details: null
        });
      }

      const result = await this.authService.register(email, password, role);

      if (result.error) {
        return res.status(result.status).json({
          error: result.error,
          message: result.message,
          details: result.details
        });
      }

      return res.status(result.status).json({
        message: result.message
      });

    } catch (error) {
      console.error('Registration error:', error);
      return res.status(500).json({
        error: true,
        message: 'Internal server error',
        details: error instanceof Error ? error.message : null
      });
    } finally {
      await this.authService.disconnect();
    }
  }

  async changePassword(req: Request, res: Response) {
    try {
      const { email, oldPassword, newPassword } = req.body;

      if (!email || !oldPassword || !newPassword) {
        return res.status(400).json({
          error: true,
          message: 'Email, old password and new password are required',
          details: null
        });
      }

      const result = await this.authService.changePassword(email, oldPassword, newPassword);

      if (result.error) {
        return res.status(result.status).json({
          error: result.error,
          message: result.message,
          details: result.details
        });
      }

      return res.status(result.status).json({
        message: result.message
      });

    } catch (error) {
      console.error('Password change error:', error);
      return res.status(500).json({
        error: true,
        message: 'Internal server error',
        details: error instanceof Error ? error.message : null
      });
    } finally {
      await this.authService.disconnect();
    }
  }
}