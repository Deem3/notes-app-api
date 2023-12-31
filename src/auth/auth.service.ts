import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  public async register(req: AuthDto) {
    try {
      const foundUser = await this.prisma.user.findUnique({
        where: { email: req.email },
      });
      if (foundUser) {
        throw new BadRequestException('Email already exists');
      }

      const hashedPassword = await this.hashPassword(req.password);

      const user = await this.prisma.user.create({
        data: {
          email: req.email,
          password: hashedPassword,
          userName: req.userName,
        },
      });

      if (!user) {
        throw new BadRequestException('Could not create user');
      }
      return user.id;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async login(body: LoginDto, req: Request, res: Response) {
    try {
      const foundUser = await this.prisma.user.findUnique({
        where: { email: body.email },
      });
      if (!foundUser) {
        throw new BadRequestException('Invalid credentials');
      }

      const isPasswordMatching = await this.comparePassword(
        body.password,
        foundUser.password,
      );

      if (!isPasswordMatching) {
        throw new BadRequestException('Invalid credentials');
      }

      const token = await this.signToken(foundUser.id, foundUser.email);

      if (!token) throw new ForbiddenException('Could not create token');

      res.cookie('token', token);

      return res.send(delete foundUser.password && foundUser);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private async hashPassword(password: string) {
    const saltOrRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    return hashedPassword;
  }

  private async comparePassword(password: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(password, hashedPassword);

    return isPasswordMatching;
  }

  private async signToken(id: string, email: string) {
    const payload = { id, email };
    return this.jwt.signAsync(payload, { secret: process.env.JWT_SECRET });
  }

  public async logout(req: Request, res: Response) {
    try {
      const token = req.headers.authorization;
      if (!token) throw new BadRequestException('No token provided');
      const user = await this.prisma.user.findUnique({
        where: { id: this.tokenDecoder(token) },
      });
      if (!user) throw new BadRequestException('User not found');
      if (!user.email && !user.password) {
        this.prisma.user.delete({
          where: { id: this.tokenDecoder(token) },
        });
      }
      res.clearCookie('token');
      return res.send('Logged out');
    } catch (error) {}
  }

  private tokenDecoder(token: string): string {
    const id = jwt.verify(token, process.env.JWT_SECRET) as {
      id: string;
      email: string;
      iat: number;
    };
    return id.id;
  }
}
