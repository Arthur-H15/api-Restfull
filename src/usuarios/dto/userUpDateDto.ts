import { IsDate, IsEmail, IsNumber, IsOptional, IsString, Matches, MinLength } from "class-validator";
import { UserDtoValidacao } from "./userDtoValidacao";

export class userUpDateDto {

    @IsOptional()
    @IsString({
        message: 'Verifique o campo Nome',
    })
    @Matches(/^[^0-9]*$/, {
        message: 'Verifique o campo Nome',
    })
    nome?: string;
    
    @IsOptional()
    @IsEmail()
    email?: string;
    
    @IsOptional()
    @IsString()
    @MinLength(8)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
        message: 'A senha deve ter pelo menos 8 caracteres, uma letra e um caractere especial',
    })
    senha?: string;
    
    @IsOptional()
    @IsString()
    @Matches(/^\d{11}$/, {
        message: 'O número de telefone deve ter  11 dígitos e não deve conter letras',
    })
    numero?: string;
    @IsOptional()
    @IsDate()
    dataAtualizacao: Date;

    @IsOptional()
    @IsNumber()
    excluido?: number;
    @IsOptional()
    @IsNumber()
    ativo?: number;

}