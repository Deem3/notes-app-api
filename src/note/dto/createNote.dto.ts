import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 100, { message: 'Title must be between 1 and 100 characters' })
  public title: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 1000, { message: 'Content must be between 1 and 1000 characters' })
  public content: string;
}
