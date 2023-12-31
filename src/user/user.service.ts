import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  public async getUserById(req: Request, res: Response) {
    const token = req.headers.authorization;
    const id = jwt.verify(token, process.env.JWT_SECRET) as {
      id: string;
      email: string;
      iat: number;
    };
    const user = await this.prisma.user.findUnique({
      where: {
        id: id.id,
      },
    });
    return res.json(delete user.password && user);
  }
}
