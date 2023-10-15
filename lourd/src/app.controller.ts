import { Controller, Get, Post, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  root() {
    console.log('Trance !'); // Ajoutez cette ligne pour le débogage
    return 'Bienvenue sur Transcandance !';
  }

  @Get('test')
  @Redirect(process.env.REDIRECT_URL_2)
  connect2(){
    console.log('Test fonctionnel');
    return(process.env.INTRA_42)
  }

  @Get('42')
  @Redirect(process.env.REDIRECT_URL)
  connect(){
    console.log('42 atteint');
    return(process.env.INTRA_42)
  }
}
