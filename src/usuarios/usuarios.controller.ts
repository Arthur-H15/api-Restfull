import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { userUpDateDto } from './dto/userUpDateDto';
import { UserDtoValidacao } from './dto/userDtoValidacao';
import { JwtAuthGuard } from 'src/auth/validacoesjwt/jwt-auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}
  
  @Get()
  findAll(){
    return this.usuariosService.findAll()
  }
  @Post()
  
  create(@Body() user: UserDtoValidacao) {
  return  this.usuariosService.create(user)
    
  }
  @Post(":id")
  
  update(@Body() user: userUpDateDto,@Param("id") id:number) {
  return  this.usuariosService.update(user,id)
  }
}
