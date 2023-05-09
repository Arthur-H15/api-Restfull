import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from './entities/Usuarios';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql', // Tipo de banco de dados
      host: process.env.TYPEORM_HOST, // Host do banco de dados
      port:  parseInt(process.env.TYPEORM_PORT), // Porta do banco de dados
      username: process.env.TYPEORM_USERNAME, // Nome de usuário do banco de dados
      password: process.env.TYPEORM_PASSWORD, // Senha do banco de dados
      database: process.env.TYPEORM_DATABASE, // Nome do banco de dados
      synchronize: true, // Sincronizar automaticamente as entidades com o banco de dados (apenas para ambiente de desenvolvimento)
      entities: [Usuarios], // Entidades do TypeORM
      
      

    }),
    UsuariosModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
