import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';

@Controller('login')
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('dm')
  loginDm(@Body() user) {
    return this.authService.login(user);
  }
}
