import { Injectable, Dependencies } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { error } from 'console';
import { Usuarios } from 'src/entities/Usuarios';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()

export class AuthService {
  constructor(
    private usuariosService:UsuariosService,
    private jwtService: JwtService
    ) {
    
  }

  async validateUser(username:string, pass:string) {
    try {
    const user = await this.usuariosService.findOneByEmailForLogin(username);
    
    if (user && this.usuariosService.validarSenha(pass,user?.senha) ) {
      const { senha, ...result } = user;
      return result;
    }
    throw new Error('usuario invalido');
} 
catch (error) {
    console.log({error})
    return undefined
}
  }
  async login(user: Usuarios) {
    const payload = user;
    return  this.jwtService.sign(payload);
    
  }
}