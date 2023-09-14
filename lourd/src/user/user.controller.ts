// user/user.controller.ts
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user') // Changé de 'users' à 'user'
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile') // Changé de 'users/profile' à 'user/profile'
  async getProfile(@Req() req: Request) {
    const user = req.user;
    return user;
  }
}
