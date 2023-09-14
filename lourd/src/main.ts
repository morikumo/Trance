import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000); // Vous pouvez choisir le port que vous souhaitez

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
