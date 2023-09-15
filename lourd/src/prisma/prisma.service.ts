// src/prisma/prisma.service.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PrismaService {
  constructor() {
    if (!prisma.$isConnected()) {
      prisma.$connect();
    }
  }

  async user() {
    return prisma.user;
  }

  // Ajoutez d'autres méthodes Prisma nécessaires ici

  async disconnect() {
    if (prisma.$isConnected()) {
      await prisma.$disconnect();
    }
  }
}
