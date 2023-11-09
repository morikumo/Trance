"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
// user/user.controller.ts
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const prisma_service_1 = require("../prisma/prisma.service");
const get_user_decorator_1 = require("../auth/decorator/get-user.decorator");
const jwt_guard_guard_1 = __importDefault(require("../jwt-guard/jwt-guard.guard"));
const jwt_1 = require("@nestjs/jwt");
let UserController = class UserController {
    constructor(userService, JwtService, prisma) {
        this.userService = userService;
        this.JwtService = JwtService;
        this.prisma = prisma;
    }
    /*     @Patch('setNickname')
        @UseGuards(JwtAuthenticationGuard)
        async setNickname(@GetUser() user: any, @Body() body: { nickname: string }) {
           //1
          try {
    
            const { nickname } = body;
            console.log("1. setNickname nickname: ", nickname);
            if (!nickname)
              throw new BadRequestException();
            const regex: RegExp = /^[a-zA-Z0-9\s\-\_]{2,20}$/;
            if (!regex.test(nickname))
              throw new BadRequestException();
            const userUpdate = await this.prisma.user.update({
              where: { id: user.id },
              data: { nickname: nickname },
            });
            return { message: 'Surnom enregistré avec succès' };
          } catch {
            throw new BadRequestException();
          }
        } */
    async setNickname(user, nickname) {
        try {
            nickname = "N";
            console.log("1. setNickname nickname: ", nickname);
            if (!nickname)
                throw new common_1.BadRequestException('Nickname is required');
            const regex = /^[a-zA-Z0-9\s\-\_]{2,10}$/;
            if (!regex.test(nickname))
                throw new common_1.BadRequestException('Invalid nickname format');
            console.log("On est ici ! ");
            console.log(await this.prisma.user.update({
                where: { id: user.id },
                data: { nickname: nickname },
            }));
            const userUpdate = await this.prisma.user.update({
                where: { id: user.id },
                data: { nickname: nickname },
            });
            return { message: 'Surnom enregistré avec succès' };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('setNickname'),
    (0, common_1.UseGuards)(jwt_guard_guard_1.default),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Query)('nickname')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "setNickname", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user') // Changé de 'users' à 'user'
    ,
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        prisma_service_1.PrismaService])
], UserController);
