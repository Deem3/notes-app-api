import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';

@Module({
  controllers: [NoteController],
  providers: [NoteService, JwtStrategy],
})
export class NoteModule {}
