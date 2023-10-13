// auth.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private prisma: PrismaService,
    private readonly UserService: UserService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const token = await this.authService.login(loginUserDto);
    return { token };
  }
}
