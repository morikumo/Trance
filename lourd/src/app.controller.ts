import { Controller, Get, Post, Redirect } from '@nestjs/common';

@Controller('Trance')
export class AppController {
  @Get()
  root() {
    console.log('Trance !'); // Ajoutez cette ligne pour le débogage
    return 'Bienvenue sur Transcandance !';
  }

  @Get('42')
  @Redirect(process.env.REDIRECT_URL)
  redirect(){
    console.log('42 atteint');

  }
}
