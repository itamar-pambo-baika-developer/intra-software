import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

export class AuthService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async login(email: string, password: string) {
    const user = await this.prisma.authorization.findUnique({
      where: { email }
    });

    if (!user) {
      return {
        error: true,
        message: 'Invalid email or password',
        status: StatusCodes.UNAUTHORIZED,
        details: null,
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return {
        error: true,
        message: 'Invalid email or password',
        status: StatusCodes.UNAUTHORIZED,
        details: null,
      };
    }

    const student = await this.prisma.aluno.findFirst({
      where: { authId: user.id }
    });

     const teacher = await this.prisma.professor.findFirst({
      where: { authId: user.id }
    });

    if (!student && !teacher) {
      return {
        error: true,
        message: 'Invalid email or password',
        status: StatusCodes.UNAUTHORIZED,
        details: null,
      };
    }

    const token = jwt.sign({ id: student ? student.id:teacher?.id, email: user.email }, process.env.SECRET_KEY ?? '', {
      expiresIn: '1d',
    });

    return {
      error: false,
      data: { token },
      message: 'Login successful',
      status: StatusCodes.OK,
      details: null,
    };
  }

  async register(email: string, password: string, role: string) {
    const existingUser = await this.prisma.authorization.findUnique({
      where: { email }
    });

    if (existingUser) {
      return {
        error: true,
        message: 'Email already in use',
        status: StatusCodes.CONFLICT,
        details: null,
      };
    }

    if (role !== 'student' && role !== 'teacher') {
      return {
        error: true,
        message: 'Invalid role',
        status: StatusCodes.BAD_REQUEST,
        details: null,
      };
    }

    if (role === 'student') {
      const student = await this.prisma.aluno.findUnique({
        where: { email }
      });

      if (student) {
        return {
          error: true,
          message: 'Email already in use',
          status: StatusCodes.CONFLICT,
          details: null,
        };
      }


    }
    if (role === 'teacher') {
      const teacher = await this.prisma.professor.findUnique({
        where: { email }
      });

      if (teacher) {
        return {
          error: true,
          message: 'Email already in use',
          status: StatusCodes.CONFLICT,
          details: null,
        };
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      await this.prisma.$transaction(async (prisma) => {
        const auth = await prisma.authorization.create({
          data: {
            email,
            password: hashedPassword,
            role
          }
        });

        if (role === 'student') {
          await prisma.aluno.update({
            where: { email },
            data: {
              email,
              authId: auth.id,
            }
          });
        } else if (role === 'teacher') {
          await prisma.professor.update({
            where: { email },
            data: {
              email,
              authId: auth.id,
            }
          });
        }

        return auth;
      });

      return {
        error: false,
        message: 'User registered successfully',
        status: StatusCodes.CREATED,
        details: null,
      };
    } catch (error) {
      return {
        error: true,
        message: 'Failed to create authentication credentials',
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        details: error instanceof Error ? error.message : error,
      };
    }
  }

  async changePassword(email: string, oldPassword: string, newPassword: string) {
    const user = await this.prisma.authorization.findUnique({
      where: { email }
    });

    if (!user) {
      return {
        error: true,
        message: 'User not found',
        status: StatusCodes.NOT_FOUND,
        details: null,
      };
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      return {
        error: true,
        message: 'Old password is incorrect',
        status: StatusCodes.UNAUTHORIZED,
        details: null,
      };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.authorization.update({
      where: { email },
      data: { password: hashedPassword }
    });

    return {
      error: false,
      message: 'Password updated successfully',
      status: StatusCodes.OK,
      details: null,
    };
  }

  async disconnect() {
    await this.prisma.$disconnect();
  }
}