/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './validacoesLocais/local-auth.guard';
import { AuthService } from './auth.service';
import { Usuarios } from 'src/entities/Usuarios';

@Controller('auth')
export class AuthController {
  constructor(
    private authService:AuthService
  ){}
 @UseGuards(LocalAuthGuard)
@Post('login')
async login(@Request() req:Request&{user:Usuarios}) {
  return this.authService.login(req.user)
}

 }
