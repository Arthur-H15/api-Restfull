import { Transform } from "class-transformer";
import { IsDate, IsEmail, IsEmpty, IsNumber, IsString, Matches, MinLength } from "class-validator";
import { pick } from 'lodash';

export class UserDtoValidacao {
    @IsString({
        message: 'Verifique o campo Nome',
    })
    @Matches(/^[^0-9]*$/, {
        message: 'Verifique o campo Nome',
    })
    nome: string;
    @IsEmail()
    email: string;
    @IsString()
    @MinLength(8)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
        message: 'A senha deve ter pelo menos 8 caracteres, uma letra e um caractere especial',
    })
    senha: string;
    @IsString()
    @Matches(/^\d{11}$/, {
        message: 'O número de telefone deve ter exatamente 11 dígitos e não deve conter letras',
    })
    numero: string;


    
    // public pickFields(): UserDtoValidacao {
    //     const expectedFields = {
    //       nome: true,
    //       email: true,
    //       senha: true,
    //       numero: true,
    //     };

    //     return pick(this, Object.keys(expectedFields)) as UserDtoValidacao;
    //   }

}