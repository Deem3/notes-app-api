import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateNoteDto } from './dto/createNote.dto';
import { NoteService } from './note.service';

@ApiTags('Note')
@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @ApiSecurity('jwt')
  @UseGuards(JwtAuthGuard)
  @Post('/')
  public async createNote(@Body() body: CreateNoteDto, @Req() req) {
    return await this.noteService.createNote(body, req);
  }
  @Get('/')
  public async getNotes(@Req() req) {
    return await this.noteService.getNotes(req);
  }
}
