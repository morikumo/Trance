// post.controller.ts

import { Controller, Get, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { PostAuthGuard } from '../auth/post-auth.guard';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @UseGuards(PostAuthGuard) // Utilisez le gardien d'authentification ici
  async getAllPosts() {
    // Votre logique pour récupérer toutes les publications
  }
}
