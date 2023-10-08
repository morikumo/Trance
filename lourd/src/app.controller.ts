import {
  Controller,
  Get,
} from '@nestjs/common';

@Controller()
export class AppController {

  @Get('Bonjour')
  getHomePage(): string {
    return 'Bienvenue sur la page d\'accueil !';
  }
}