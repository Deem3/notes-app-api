import { BadRequestException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'prisma/prisma.service';
import { CreateNoteDto } from './dto/createNote.dto';

@Injectable()
export class NoteService {
  constructor(private readonly prisma: PrismaService) {}

  public async createNote(body: CreateNoteDto, req: Request) {
    const token = req.headers.authorization;
    const note = await this.prisma.note.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: this.tokenDecoder(token),
      },
    });
    if (!note) {
      throw new BadRequestException('Note not created');
    }
    return note.id;
  }

  public async getNotes(req: Request) {
    const token = req.headers.authorization;
    if (!token) {
      throw new BadRequestException('Token not found');
    }
    const notes = await this.prisma.note.findMany({
      where: {
        authorId: this.tokenDecoder(token),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return notes;
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
