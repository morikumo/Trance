// user/user.module.ts
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PostController } from './post.controller'; // Importez le contrôleur des publications
import { PostService } from './post.service'; // Importez le service des publications

@Module({
  controllers: [UserController, PostController], // Ajoutez le contrôleur des publications ici
  providers: [UserService, PostService], // Ajoutez le service des publications ici
})
export class UserModule {}
