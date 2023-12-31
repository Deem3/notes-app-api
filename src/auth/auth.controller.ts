import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto, LoginDto } from './dto/index';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public register(@Body() req: AuthDto) {
    return this.authService.register(req);
  }

  @Post('login')
  public login(@Body() body: LoginDto, @Req() req, @Res() res) {
    return this.authService.login(body, req, res);
  }

  @Post('logout')
  public logout(@Req() req, @Res() res) {
    return this.authService.logout(req, res);
  }
}
