import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { PrismaClient, User as PrismaUser } from '@prisma/client'; // Importez le modèle User de Prisma

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaClient, // Injectez le client Prisma
  ) {}

  async validateUser(email: string, pass: string): Promise<PrismaUser | null> {
    const user = await this.prisma.user.findUnique({ where: { email } }); // Utilisez Prisma pour trouver l'utilisateur
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(loginUserDto.email, loginUserDto.password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Si l'utilisateur est authentifié avec succès, générez un token JWT
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Vous pouvez supprimer la méthode findByEmail car elle est maintenant intégrée dans validateUser
}
