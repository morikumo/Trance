// auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && user.validatePassword(pass)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginUserDto: LoginUserDto) {
    // Votre logique d'authentification ici (vérification des informations de connexion)

    const user = await this.userService.findByEmail(loginUserDto.email);

    if (!user || !user.validatePassword(loginUserDto.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Si l'utilisateur est authentifié avec succès, générez un token JWT
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Ajoutez la méthode findByEmail ici
  async findByEmail(email: string) {
    return this.userService.findByEmail(email);
  }
}
