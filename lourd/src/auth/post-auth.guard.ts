// post-auth.guard.ts

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class PostAuthGuard extends AuthGuard('jwt') {}
