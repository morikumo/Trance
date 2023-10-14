import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { Response } from 'express';
import { PrismaClient, User as PrismaUser, User } from '@prisma/client'; // Importez le modèle User de Prisma
import { config } from 'dotenv';
config();

const axios = require('axios');
const client_id = process.env.UID_42;
const clientSecret = process.env.SECRET_42;
const redirect_url = process.env.URL_REDIRECT;

@Injectable()
export class AuthService {
  [x: string]: any;
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private prisma: PrismaClient, // Injectez le client Prisma
  ) {}

  async apiConnexion(userData: any, token: string, res: Response): Promise<User | null> {
    try {
        let user: User;
        user = await this.userService.findUserByEmail(userData.email);
        if (!user) {
            res.redirect(`` + process.env.URL_LOCAL + `/setNickname?token=${token}`);
        }
        else {
                await this.prisma.user.update({
                  where: { id: user.id },
                  data: {},
                })
                res.redirect(process.env.URL_LOCAL);
            }
        return user;
    } catch {
        throw new BadRequestException();
    }
  }

  async getAccessToken(code: string): Promise<any> {
    try {
        const response = await axios.post(process.env.TOKEN_42, {
            client_id: client_id,
            client_secret: clientSecret,
            grant_type: "authorization_code",
            code: code,
            redirect_uri: redirect_url,
        });
        const accessToken = response.data.access_token;
        return accessToken;
    } catch {
        throw new HttpException('Failed to retrieve access token', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

async getUserData(accessToken: string): Promise<any> {
  try {
      const userResponse = await axios.get(process.env.URL_42ME, {
          headers: {
              "Authorization": `Bearer ${accessToken}`
          }
      });
      return {
          id: userResponse.data.id,
          name: userResponse.data.login,
          email: userResponse.data.email,
          code: userResponse.data.code,
          pfp: userResponse.data.image.link,
      };
  } catch {
      throw new HttpException('Failed to retrieve user data', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}


  // Vous pouvez supprimer la méthode findByEmail car elle est maintenant intégrée dans validateUser
}
