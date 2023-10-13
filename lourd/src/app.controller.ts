import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  root() {
    console.log('La route racine est atteinte !'); // Ajoutez cette ligne pour le débogage
    return 'Hello from NestJS!';
  }
}
