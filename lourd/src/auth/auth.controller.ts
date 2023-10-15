// auth.controller.ts

import { Controller, Post, Body, Get, BadRequestException, Req, Res, Redirect } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';

import { Request } from 'express';
import { Response } from 'express';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private prisma: PrismaService,
    private readonly UserService: UserService) {}

    @Get('test')
    connec(){
      console.log('42 atteint');
    }

    @Get('login')
    async login(@Req() req: Request, @Res() response: Response): Promise<any> {
      try {
        const buffer = req.query.code as string;
        if (buffer === undefined) {
          throw new BadRequestException('Code is missing');}
        const accessToken = await this.authService.getAccessToken(buffer);
        const userData = await this.authService.getUserData(accessToken);
        await this.authService.apiConnexion(userData, accessToken, response);
      } catch {
        throw new BadRequestException();
      }
    }
    
}
