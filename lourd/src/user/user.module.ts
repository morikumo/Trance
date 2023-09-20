// user/user.module.ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from '../prisma/prisma.module'; // Assurez-vous d'importer PrismaModule

@Module({
  imports: [PrismaModule], // N'oubliez pas d'ajouter PrismaModule ici
  providers: [UserService],
  exports: [UserService], // Si UserService doit être utilisé à l'extérieur de UserModule
})
export class UserModule {}
