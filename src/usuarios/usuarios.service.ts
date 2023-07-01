
import { BadRequestException, Injectable } from '@nestjs/common';
import { Usuarios } from '../entities/Usuarios';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { userUpDateDto } from './dto/userUpDateDto';
import { UserDtoValidacao } from './dto/userDtoValidacao';
import { UsuariosGet, UsuariosPatchId, UsuariosPost } from 'src/interfacesDeRetorno';
import { UsuariosAssets } from './usuarios.assets';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuarios)
    private UsuarioRP: Repository<Usuarios>,
    private usuairoAssets:UsuariosAssets
  ) { }
  async findOneByEmailForLogin(email: string) {
    try {
      let usuario = await this.UsuarioRP.findOneOrFail({ where: { email, excluido: 0, ativo: 1 }, select: ['id', 'nome', 'email', 'senha', 'numero'] })
      if (!usuario) throw new BadRequestException("usuario nao existe")
      return usuario
    }
    catch (error) {
      return error.response ? error.response : error
    }
    //  return this.UsuarioRP.findOneOrFail({where:{email,excluido:0,ativo:1},select:['id','nome','email','senha','numero']})

  }
  async findAll(): Promise<UsuariosGet[]> {
    try {
      const usuario = await this.UsuarioRP.find({ select: ['id', 'nome', 'email', 'numero', 'excluido', 'ativo'] }) as UsuariosGet[]
      if (usuario.length == 0) throw new BadRequestException("nem um usuario encontrado")
      return usuario
    } catch (error) {

      return error.response ? error.response : error
    }


  }
  async findOne(id:number): Promise<UsuariosGet> {
    try {
      const usuario = await this.UsuarioRP.findOneOrFail({where:{id}, select: ['id', 'nome', 'email', 'numero', 'excluido', 'ativo'] }) as UsuariosGet
      
      return usuario
    } catch (error) {

      return error.response ? error.response : error
    }


  }
  async create(usuario: UserDtoValidacao): Promise<UsuariosPost> {
    try {
      const novoUsuario = this.UsuarioRP.create(usuario)
      novoUsuario.senha = this.usuairoAssets.criptografarSenha(novoUsuario.senha)
      if (!novoUsuario) throw new BadRequestException("error ao criar Usuario");
      const usuarioSavo = await this.UsuarioRP.save(novoUsuario).catch(e => {
        if (e.errno == 1062) throw new BadRequestException("Usuario ja cadastrado");
        throw new BadRequestException(e.code);

      })
      console.log({ usuarioSavo })
      return { id: usuarioSavo.id, nome: usuarioSavo.nome, mensagem: `Usuario  ${usuarioSavo.nome} criado com sucesso` }
    } catch (error) {
      console.log({ error })
      return error.response ? error.response : error
    }

  }
  async update(usuario: userUpDateDto, id: number): Promise<UsuariosPatchId> {
    try {
      const camposPadroes = { dataAtualizacao: new Date() }
      const updateUser = this.UsuarioRP.create({ ...usuario, ...camposPadroes })
      if (updateUser?.senha) updateUser.senha = this.usuairoAssets.criptografarSenha(updateUser.senha);
      if (!updateUser) throw new BadRequestException("error ao Atualizar Usuario");
      let atualizado = await this.UsuarioRP.update(id, updateUser).catch(e => {
        throw new BadRequestException(e.code);

      })
      if (atualizado.affected < 1) throw new BadRequestException("error ao Atualizar Usuario");
      const usuarioAtualizado = await this.UsuarioRP.findOne({ where: { id } })
      return { id: usuarioAtualizado.id, nome: usuarioAtualizado.nome, mensagem: `Usuario  ${usuarioAtualizado.nome} Atualizado com sucesso` }

    } catch (error) {
      return error.response ? error.response : error

    }

  }
  async delete(id: number) {
    this.UsuarioRP.update(id,{excluido:1})
  }

  // adicionarPropriedades(dados,tipoObjeto:number) {
  //   if(!dados) return dados;
  //   let retorno={};
  //   let chavesExcluidas=["excluido","ativo","dataCriacao","dataAtualizacao"];
  //   if(tipoObjeto==2) chavesExcluidas=["dataCriacao","dataAtualizacao"];
  //  const chavesDados = Object.keys(dados); 
  //  console.log(chavesDados)
  // for (let index = 0; index < chavesDados.length; index++) {
  //   const chave = chavesDados[index];
  //   if(chavesExcluidas.some(f=>f==chave))continue;
  //     retorno[chave] = dados[chave];
  // }
  //   return retorno;
  // }
}