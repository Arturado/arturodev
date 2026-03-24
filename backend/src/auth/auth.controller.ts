import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

export class LoginDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: LoginDto) {
    console.log('Body recibido:', body);
    console.log('Email:', body?.email);
    console.log('Password:', body?.password);
    return this.authService.login(body.email, body.password);
  }
}