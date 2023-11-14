// auth.controller.ts

import { Controller, Post, Body, Get, BadRequestException, Req, Res, Redirect, Patch } from '@nestjs/common';
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
    connec(@Req() req: Request, @Res() response: Response){
      response.redirect("https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-aeba805b245ea71102f8f22a968dba17bf5d1a866dc5fe07bca7e32f61a5f496&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fauth%2Flogin&response_type=code");
      console.log('42 atteint');
    }

    @Get('login')
    async login(@Req() req: Request, @Res() response: Response) {
      const code = req.query.code;
      //console.log("voici la valeur de code : ",code);

      if (!code) {
        throw new BadRequestException('Code is missing');}

      try {
        const accessToken = await this.authService.getAccessToken(code); //ok
        //console.log("Pour login 1.voici la valeur de accessToken : ",accessToken); 
        const userData = await this.authService.getUserData(accessToken); 
        //console.log("Pour login 2.voici la valeur de userData : ",userData);
        await this.authService.apiConnexion(userData, accessToken, response);
        //console.log("Pour login 3.voici la valeur de response : ",response);
      } catch (error){
        console.log("La raison du probleme : ",error);
        throw new BadRequestException(error);
      }
    }

    @Patch('checkNickname')
    async checkNickname(@Res() res: Response, @Body() body: { nickname: string, token: string }) {
      const { nickname, token } = body;
      try {
        const user = await this.prisma.user.findUnique({ where: { nickname: nickname } });
        if (user !== null) {
          throw new BadRequestException("already used");
        }
        const regex: RegExp = /^[a-zA-Z0-9\s\-\_]{2,20}$/;
        if (!regex.test(nickname))
          throw new BadRequestException("wrong regex");
        await this.authService.connexionPostNickname(token, nickname, res);
      } catch (err) {
        throw err;
      }
    }

@Get('connect2fa')
async connect2fa(@Req() req: any, @Res() res: any) {
  const code = req.query.code;
  console.log("voici la valeur de code 1: ", code);
  const id = req.query.id;
  console.log("voici la valeur de id 2: ", id);
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
