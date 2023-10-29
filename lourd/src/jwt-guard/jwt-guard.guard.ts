import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
 
@Injectable()
export default class JwtGuard extends AuthGuard('jwt') {
    consoleLog(message: string) {
        console.log("On est passer par ici pour voir si ça marche",message);
    }
}