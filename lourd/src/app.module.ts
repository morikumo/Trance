// src/app.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './user/user.service'; // Assurez-vous d'importer votre service UserService
import { AppController } from './app.controller';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthService } from './auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';


@Module({
  imports: [PrismaModule, AuthModule],
  providers: [UserService, PrismaService],
  controllers: [UserController, AppController],
})
export class AppModule {}
