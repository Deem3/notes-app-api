import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class AuthDto {
  @ApiProperty()
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  public email?: string;
  @ApiProperty()
  @IsStrongPassword()
  @IsString()
  @IsNotEmpty()
  @Length(8, 20, { message: 'Password must be between 8 and 20 characters' })
  public password?: string;
  @ApiProperty()
  @IsNotEmpty()
  @Length(4, 20, { message: 'Password must be between 4 and 20 characters' })
  @IsString()
  public userName: string;
}
