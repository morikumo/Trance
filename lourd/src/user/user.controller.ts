// user/user.controller.ts
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { PrismaService } from '../prisma/prisma.service';

@Controller('user') // Changé de 'users' à 'user'
export class UserController {
  constructor(private readonly userService: UserService,
    private readonly prisma: PrismaService) {}

  @Get('profile') // Changé de 'users/profile' à 'user/profile'
  async getProfile(@Req() req: Request) {
    const user = req.user;
    return user;
  }
}
