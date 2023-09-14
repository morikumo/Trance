// auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() user: any) {
    // Appelez le service d'authentification pour gérer la connexion
    return this.authService.signIn(user);
  }
}
