import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaClient) {}

  async findOne(options: { where: { email: string } }) {
    return this.prisma.user.findUnique(options);
  }

  async create(data: { data: { email: string; password: string } }) {
    return this.prisma.user.create(data);
  }

  async validatePassword(email: string, password: string) {
    const user = await this.findOne({ where: { email } });
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
}
