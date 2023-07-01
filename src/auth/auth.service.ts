import { Injectable, Dependencies } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { error } from 'console';
import { Usuarios } from 'src/entities/Usuarios';
import { AuthLoginPost } from 'src/interfacesDeRetorno';
import { UsuariosAssets } from 'src/usuarios/usuarios.assets';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()

export class AuthService {
  constructor(
    private usuariosService:UsuariosService,
    private jwtService: JwtService,
   private  usuariosAssets:UsuariosAssets
    ) {
    
  }

  async validateUser(username:string, pass:string) {
    try {
    const user = await this.usuariosService.findOneByEmailForLogin(username);
    
    if (user && this.usuariosAssets.validarSenha(pass,user?.senha) ) {
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
  async login(user: Usuarios):Promise<AuthLoginPost> {
    const payload = user;
    return { token:this.jwtService.sign(payload)};
    
  }
}