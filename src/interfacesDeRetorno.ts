import { ApiProperty } from "@nestjs/swagger";

export class UsuariosGet{
    @ApiProperty()
    'id':number;
    @ApiProperty()
    'nome':string;
    @ApiProperty()
    'email':string;
    @ApiProperty()
    'numero':string;
    'excluido':number
    @ApiProperty()
    'ativo':number;
}
export class UsuariosPost{
    @ApiProperty()
    id:number;
    @ApiProperty()
    nome:string;
    @ApiProperty()
    mensagem:string;
    
}
export class UsuariosPatchId extends UsuariosPost{
    
}
export class AuthLoginPost{
    @ApiProperty()
    token:string;
}