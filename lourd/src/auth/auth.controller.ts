// auth.controller.ts

import { Controller, Post, Body, Get, BadRequestException, Req, Res, Redirect } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';

import { Request } from 'express';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { TwofaService } from '../twofa/twofa.service';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly UserService: UserService,
    private readonly twoFaService: TwofaService)
    {}

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
    

@Get('connect2fa')
async connect2fa(@Req() req: any, @Res() res: any) {
  const code = req.query.code;
  console.log("voici la valeur de code 1: ", code);
  const id = req.query.id;
  console.log("voici la valeur de id 2: ", id);

  if (!code || !id) {
    return res.status(400).send('Code or ID is missing');
  }
  try {
        const user = await this.UserService.getUserById(id);
        if (!user.twoFactorSecret || !user.twoFactorEnabled) {
          throw new BadRequestException('2Fa is not enabled for this user');
        }
        const isCodeValid = this.twoFaService.isTwoFactorAuthenticationCodeValid(code, user);
        if (!isCodeValid) {
          throw new BadRequestException('Wrong authentication code');
        }
        await this.authService.apiConnexion2fa(user, res);
        await this.prisma.user.update({
          where: { id: 1 },
          data: { state: 'ONLINE' },
        })
        res.status(200).json({ message: 'Connexion réussie' });
      } catch {
        throw new BadRequestException();
      }
    }
}
