import { Controller, Get, Post, Redirect } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AppController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ){}
  
  @Get()
  root() {
    console.log('Trance !'); // Ajoutez cette ligne pour le débogage
    return 'Bienvenue sur Transcandance !';
  }
  @Get('test')
  @Redirect(process.env.REDIRECT_URL_2)
  getConnected(){
    return(()=> process.env.INTRA_42)
  }

  @Get('42')
  @Redirect(process.env.REDIRECT_URL)
  connect(){
    console.log('42 atteint');
    return(process.env.INTRA_42)
  }

  @Get('2fa')
  @Redirect(process.env.REDIRECT_URL_3)
  lourd(){
    console.log('2fa atteint');
    return(()=> process.env.INTRA_42)
  }
}
