import { PrismaClient } from '@prisma/client';
import {
  ResponseDeleteNote,
  ResponseGetAllNotes,
  ResponseGetNote,
  ResponseUpdateNote,
} from '../interfaces/note/response.interface';
import { RestCreateNote, RestUpdateNote } from '../interfaces/note/rest.interface';

const note = new PrismaClient().note;

export class NoteService {
  public async createNote(req: RestCreateNote): Promise<string> {
    try {
      const data = await note.create({
        data: {
          title: req.title,
          content: req.content,
          userId: req.userId,
        },
      });
      return data.id;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return 'something went wrong when creating note';
    }
  }
  public async getNotes(id: string): Promise<ResponseGetNote> {
    try {
      const data = await note.findUnique({
        where: {
          id,
        },
      });
      if (!data) {
        return {
          error: {
            message: 'note not found',
          },
        };
      }
      return {
        data: {
          id: data?.id,
          title: data?.title,
          content: data?.content,
          userId: data?.userId,
          createdAt: data?.createdAt,
          updatedAt: data?.updatedAt,
        },
      };
    } catch (error) {
      const res: ResponseGetNote = {
        error: { message: (error as Error).message },
      };
      return res;
    }
  }

  public async deleteNote(id: string): Promise<ResponseDeleteNote> {
    try {
      await note.delete({
        where: {
          id,
        },
      });
      return {
        data: {
          state: 'success',
        },
      };
    } catch (error) {
      const res = {
        error: { message: (error as Error).message },
      };
      return res;
    }
  }

  public async updateNote(req: RestUpdateNote): Promise<ResponseUpdateNote> {
    try {
      const data = await note.update({
        where: {
          id: req.id,
        },
        data: {
          title: req.title,
          content: req.content,
        },
      });
      return {
        data: {
          id: data.id,
        },
      };
    } catch (error) {
      const res = {
        error: { message: (error as Error).message },
      };
      return res;
    }
  }

  public async getAllNotes(userId: string): Promise<ResponseGetAllNotes> {
    try {
      const data = await note.findMany({
        where: {
          userId,
        },
      });
      return {
        data: data,
      };
    } catch (error) {
      const res = {
        error: { message: (error as Error).message },
      };
      return res;
    }
  }
}
