import { IsDate, IsEmail, IsNumber, IsOptional, IsString, Matches, MinLength } from "class-validator";
import { UserDtoValidacao } from "./userDtoValidacao";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class userUpDateDto {

    @IsOptional()
    @IsString({
        message: 'Verifique o campo Nome',
    })
    @Matches(/^[^0-9]*$/, {
        message: 'Verifique o campo Nome',
    })
    @ApiPropertyOptional()
    nome?: string;
    
    @IsOptional()
    @IsEmail()
    @ApiPropertyOptional()
    email?: string;
    
    @IsOptional()
    @IsString()
    @MinLength(8)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
        message: 'A senha deve ter pelo menos 8 caracteres, uma letra e um caractere especial',
    })
    @ApiPropertyOptional()
    senha?: string;
    
    @IsOptional()
    @IsString()
    @Matches(/^\d{11}$/, {
        message: 'O número de telefone deve ter  11 dígitos e não deve conter letras',
    })
    @ApiPropertyOptional()
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