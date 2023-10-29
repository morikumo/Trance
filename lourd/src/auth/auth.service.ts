import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { Response } from 'express';
import { User } from '@prisma/client'; // Importez le modèle User de Prisma
import { config } from 'dotenv';
import { TwofaService } from '../twofa/twofa.service';
import  dotenv  from 'dotenv';
config();

const axios = require('axios');
const client_id = process.env.UID_42;
const clientSecret = process.env.SECRET_42;
const redirect_url = process.env.REDIRECT_URL;

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService, // Injectez le client Prisma
    private userService: UserService,
    private jwtService: JwtService,
    private TwofaService: TwofaService,
  ) {}

  async apiConnexion(userData: any, token: string, res: Response): Promise<User | any> {
    try {
        //console.log("1. APICONNEXION userData: ", userData);
        //console.log("2. APICONNEXION token: ", token);

        const user = await this.userService.findUserByEmail(userData.email);
        if (!user) {
            console.log("Avant la redirection");            
            res.redirect(`${process.env.URL_LOCAL}/profile/setNickname?token=${token}`);
        }
        else {
            if (user.twoFactorEnabled) {
                res.redirect(`` + process.env.URL_LOCAL + `/2fa?id=${user.id}`);
            }
            else {
            console.log("YEEEEEEEEEEEA ");
                await this.prisma.user.update({
                  where: { id: user.id },
                  data: {state: 'ONLINE'},
                })
               console.log("user: ", this.prisma.user);
                const newToken = await this.generateAndSetAccessToken(user);
                res.cookie("accessToken", newToken);
                console.log("newToken: ", newToken);
                res.redirect(process.env.URL_LOCAL + `/`);
            }
        }
        return user;
    } catch (error){
        console.log("La raison du probleme : ",error);
        throw new BadRequestException(error);
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
        //console.log("Access token valeur: ", accessToken);
        return accessToken;
    }
    catch (error: any) {
        if (error.response && error.response.data) {
            console.error("Error from 42 API:", error.response.data);
        } else {
            console.error("Unexpected error:", error);
        }
        throw new HttpException('Failed to retrieve access token', HttpStatus.INTERNAL_SERVER_ERROR);
    }    
  }
  

  async getUserData(accessToken: string , code: string): Promise<any> {
    try {
        const userResponse = await axios.get(process.env.ME_42, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });
        return {
            id: userResponse.data.id,
            name: userResponse.data.login,
            email: userResponse.data.email,
            code: code,
            pfp: userResponse.data.image.link,
        };
    } catch {
        throw new HttpException('Failed to retrieve user data', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async generateAndSetAccessToken(user: User): Promise<string> {
    try {
        const jwtPayload = { username: user.name, sub: user.id };
        //console.log("jwtPayload: ", jwtPayload);
        const newToken = this.jwtService.sign(jwtPayload);
       // console.log("newToken: ", newToken);
        return newToken;
    } catch {
        throw new BadRequestException();
    }
}




async apiConnexion2fa(user: User, res: Response): Promise<void> {
    try {
        if (!user)
            throw new BadRequestException("user doesn't exist");
        else {
            const newToken = await this.generateAndSetAccessToken(user);
            res.cookie("accessToken", newToken);
        }
    } catch {
        throw new BadRequestException();
    }
}

  // Vous pouvez supprimer la méthode findByEmail car elle est maintenant intégrée dans validateUser
}
