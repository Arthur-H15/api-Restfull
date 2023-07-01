import * as bcrypt from 'bcrypt';
export class UsuariosAssets{
    criptografarSenha(senha: string) {
        return bcrypt.hashSync(senha, 10)
      }
      validarSenha(senha: string, hashSenha: string) {
        return bcrypt.compareSync(senha, hashSenha)
      }

}