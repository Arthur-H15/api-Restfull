import { ApiProperty } from "@nestjs/swagger"

export class Login{
    @ApiProperty()
    email: string;
    @ApiProperty()
     senha: string;
}