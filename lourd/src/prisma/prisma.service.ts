// prisma/prisma.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService {
  constructor(private readonly prisma: PrismaClient) {}


  getPrismaClient() {
    return this.prisma;}

    getUsers() {
      return this.prisma.user.findMany();}
}
