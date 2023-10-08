//main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
const { PrismaClient } = require('@prisma/client');


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: process.env.URL_LOCAL, credentials: true });
  await app.listen(3001);

  const prisma = new PrismaClient();
}
bootstrap();
// Dans votre code
console.log(process.env.DATABASE_URL); // Vérifiez si DATABASE_URL est définie
console.log(process.env.URL_LOCAL); // Vérifiez si DATABASE_URL est définie
