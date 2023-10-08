// post.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Supposons que vous avez un service Prisma

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async createPost(data: { title: string; content: string; authorId: number }) {
    return this.prisma.post.create({
      data,
    });
  }

  async getAllPosts() {
    return this.prisma.post.findMany();
  }

  // Ajoutez d'autres méthodes pour gérer les publications, par exemple, pour récupérer une publication par ID, la mettre à jour, ou la supprimer.
}
