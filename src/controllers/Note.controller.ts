import { Body, Controller, Delete, Get, Path, Post, Put, Route, Tags } from 'tsoa';
import {
  ResponseCreateNote,
  ResponseDeleteNote,
  ResponseGetAllNotes,
  ResponseGetNote,
} from '../interfaces/note/response.interface';
import { RestCreateNote, RestUpdateNote } from '../interfaces/note/rest.interface';
import { NoteService } from '../services/NoteService';

@Route('/note')
export class NoteController extends Controller {
  @Post('/createNote')
  @Tags('CreateNote')
  public async createNote(@Body() req: RestCreateNote): Promise<ResponseCreateNote> {
    this.setHeader('Content-Type', 'application/json');
    const data = await new NoteService().createNote(req);
    if (!data) {
      this.setStatus(404);
      return {
        error: {
          message: data,
        },
      };
    }
    this.setStatus(201);
    return {
      data: {
        id: data,
      },
    };
  }

  @Get('/getNotes/{id}')
  @Tags('GetNotes')
  public async getNotes(@Path() id: string): Promise<ResponseGetNote> {
    this.setHeader('Content-Type', 'application/json');
    const data = await new NoteService().getNotes(id);
    if (data.error) {
      this.setStatus(404);
      return data;
    }
    this.setStatus(200);
    return data;
  }

  @Delete('/deleteNote/{id}')
  @Tags('DeleteNote')
  public async deleteNote(@Path() id: string): Promise<ResponseDeleteNote> {
    this.setHeader('Content-Type', 'application/json');
    const data = await new NoteService().deleteNote(id);
    if (data.error) {
      this.setStatus(404);
      return data;
    }
    this.setStatus(200);
    return data;
  }

  @Put('/updateNote')
  @Tags('UpdateNote')
  public async updateNote(@Body() req: RestUpdateNote) {
    this.setHeader('Content-Type', 'application/json');
    const data = await new NoteService().updateNote(req);
    if (data.error) {
      this.setStatus(404);
      return data;
    }
    this.setStatus(200);
    return data;
  }

  @Get('/getAllNotes/{userId}')
  @Tags('GetAllNotes')
  public async getAllNotes(@Path() userId: string): Promise<ResponseGetAllNotes> {
    this.setHeader('Content-Type', 'application/json');
    const data = await new NoteService().getAllNotes(userId);
    if (data.error) {
      this.setStatus(404);
      return data;
    }
    this.setStatus(200);
    return data;
  }
}
