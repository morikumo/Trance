//main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import * as morgan from 'morgan';
import * as express from 'express';
const { PrismaClient } = require('@prisma/client');


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan.default('dev'));
  app.enableCors({ origin: process.env.URL_LOCAL, credentials: true });
  await app.listen(3001);
  const prisma = new PrismaClient();
}
bootstrap();
// Dans votre code
//console.log(process.connected.valueOf.name.); // Vérifiez si DATABASE_URL est définie
//console.log(process.);
//console.log(process.env.URL_LOCAL); // Vérifiez si DATABASE_URL est définie
