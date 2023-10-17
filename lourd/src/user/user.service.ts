import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User} from '@prisma/client';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(userData: CreateUserDto, nickname: string): Promise<User> {
    try {
       // Vérifiez si un utilisateur avec le même e-mail existe déjà
      const existingUser = await this.prisma.user.findUnique({ where: { email: userData.email } });

      if (existingUser) {
        throw new HttpException('User with this email already exists', HttpStatus.CONFLICT);
       }
       // Hasher le mot de passe avant de l'enregistrer 
      const user = await this.prisma.user.create({
        data: {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          nickname: userData.nickname,
          state: userData.state,
        }
      });
      return user;
    } catch (error) {
      console.error(error);
      throw new HttpException('Failed to create user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteUser(id: number): Promise<User> {
    try {
      const user = await this.prisma.user.delete({
        where: { id: id }
      });
      return user;
    } catch (error) {
      console.error(error);
      throw new HttpException('Failed to delete user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      return this.prisma.user.findUnique({
        where: { email },
      });
    } catch {
      throw new BadRequestException();
    }
  }
}