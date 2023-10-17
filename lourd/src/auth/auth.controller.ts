// auth.controller.ts

import { Controller, Post, Body, Get, BadRequestException, Req, Res, Redirect } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';

import { Request } from 'express';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly UserService: UserService) {}

    @Get('test')
    connec(){
      console.log('42 atteint');
    }

    @Get('login')
    async login(@Req() req: Request, @Res() response: Response): Promise<any> {
      console.log("Login route hit");
      const code = req.query.code;
      console.log("voici la valeur de code : ",code);

      if (!code) {
        throw new BadRequestException('Code is missing');}

      try {
        const accessToken = await this.authService.getAccessToken(code);
        const userData = await this.authService.getUserData(accessToken);
        await this.authService.apiConnexion(userData, accessToken, response);
      } catch (error){
        console.error(error);
        throw new BadRequestException();
      }
    }
    
}
