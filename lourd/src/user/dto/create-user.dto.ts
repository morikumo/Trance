/* // src/user/dto/create-user.dto.ts
import { IsEmail, IsNotEmpty, IsString, MinLength, IsNumberString } from 'class-validator';

export class CreateUserDto {

  @IsNumberString()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
 */

export class CreateUserDto {
    /* private */ name: string;
    /* private */ email: string;
    /* private */ password: string;
    /* private */ nickname: string;
    /* private */ id: number;
  
    constructor(userData: any) {
      this.name = userData.name;
      this.email = userData.email;
      this.password = userData.password;
      this.nickname = userData.nickname;
      this.id = userData.id;
    }
  
    getName(): string {
      return this.name;
    }
  
    setName(name: string): void {
      this.name = name;
    }
  
    getEmail(): string {
      return this.email;
    }
  
    setEmail(email: string): void {
      this.email = email;
    }
  
    getPassword(): string {
      return this.password;
    }
  
    setPassword(password: string): void {
      this.password = password;
    }
  
    getId(): number {
      return this.id;
    }
  
    setId(id: number): void {
      this.id = id;
    }

    getNickname(): string {
      return this.nickname;
    }

    setNickname(nickname: string): void {
      this.nickname = nickname;
    }
  }
  