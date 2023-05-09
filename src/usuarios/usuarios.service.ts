
import { BadRequestException, Injectable } from '@nestjs/common';
import { Usuarios } from '../entities/Usuarios';
import { Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { userUpDateDto } from './dto/userUpDateDto';
import * as bcrypt from 'bcrypt';
import { UserDtoValidacao } from './dto/userDtoValidacao';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuarios)
    private UsuarioRP:Repository<Usuarios>
  ){}
  async findOneByEmailForLogin(email:string){
  try {
    let usuario= await  this.UsuarioRP.findOneOrFail({where:{email,excluido:0,ativo:1},select:['id','nome','email','senha','numero']})
  if(!usuario) throw new BadRequestException("usuario nao existe")
  return usuario}
  catch(error){
    return  error.response ? error.response : error 
  }
  //  return this.UsuarioRP.findOneOrFail({where:{email,excluido:0,ativo:1},select:['id','nome','email','senha','numero']})
    
  }
 async findAll(){
  try {
    const usuario=await this.UsuarioRP.find({select:['id','nome','email','numero','excluido','ativo']})
    if(usuario.length==0) throw new  BadRequestException("nem um usuario encontrado")
    return usuario
  } catch (error) {

    return error.response ? error.response : error 
  }
  
   
  }
async create(usuario:UserDtoValidacao){
  try {
    const novoUsuario= this.UsuarioRP.create(usuario)
    novoUsuario.senha=this.criptografarSenha(novoUsuario.senha)
    if(!novoUsuario) throw new BadRequestException("error ao criar Usuario");
    const usuarioSavo = await this.UsuarioRP.save(novoUsuario).catch(e=>{
      if(e.errno==1062)throw new BadRequestException("Usuario ja cadastrado");
      throw new BadRequestException(e.code);

    })
    
    return usuarioSavo
  } catch (error) {
    
    return error.response ? error.response : error 
  }
   
  }
 async update(usuario:userUpDateDto,id:number){
    try {
    const camposPadroes ={dataAtualizacao:new Date()}
      const updateUser=this.UsuarioRP.create({...usuario,...camposPadroes})
      if(updateUser?.senha) updateUser.senha=this.criptografarSenha(updateUser.senha) ;
    if(!updateUser) throw new BadRequestException("error ao Atualizar Usuario");
     let atualizado= await this.UsuarioRP.update(id,updateUser)
     if(atualizado.affected<1) throw new BadRequestException("error ao Atualizar Usuario");
      return this.UsuarioRP.findOne({where:{id}})
      
    } catch (error) {
      return error.response ? error.response : error 
      
    }
    
  }
  criptografarSenha(senha:string){
    return bcrypt.hashSync(senha,10)
  }
  validarSenha(senha:string,hashSenha:string){
    return bcrypt.compareSync(senha,hashSenha)
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