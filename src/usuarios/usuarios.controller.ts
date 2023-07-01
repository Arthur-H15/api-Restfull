import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { userUpDateDto } from './dto/userUpDateDto';
import { UserDtoValidacao } from './dto/userDtoValidacao';
import { JwtAuthGuard } from 'src/auth/validacoesjwt/jwt-auth.guard';
import { ApiTags,ApiBearerAuth } from '@nestjs/swagger';
import { UsuariosGet } from 'src/interfacesDeRetorno';
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe({whitelist:true}))
@ApiTags('Usuarios')
@ApiBearerAuth()
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}
  
  @Get()
  findAll():Promise<UsuariosGet[]>{
    return this.usuariosService.findAll()
  }
  @Post()
  create(@Body() user: UserDtoValidacao) {
    console.log('asasa')
  return  this.usuariosService.create(user)
    
  }
  @Patch(":id")
  update(@Body() user: userUpDateDto,@Param("id") id:number) {
  return  this.usuariosService.update(user,id)
  }
  @Delete(":id")
  delete(@Param("id") id:number){
    return this.usuariosService.delete(id)

  }
}
