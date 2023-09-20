// src/app.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './user/user.service'; // Assurez-vous d'importer votre service UserService


@Module({
  imports: [PrismaModule],
  providers: [UserService],
})
export class AppModule {}
