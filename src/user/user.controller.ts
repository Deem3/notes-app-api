import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiSecurity('jwt')
  @UseGuards(JwtAuthGuard)
  @Get('')
  public async getUserById(@Req() req, @Res() res) {
    return await this.userService.getUserById(req, res);
  }
}
