//main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const prisma = new PrismaClient();
}
// Dans votre code
const dotenv = require('dotenv');
dotenv.config(); // Charge les variables d'environnement depuis le fichier .env
console.log(process.env.DATABASE_URL); // Vérifiez si DATABASE_URL est définie
bootstrap();
