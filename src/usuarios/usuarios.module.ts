import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from 'src/entities/Usuarios';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService],
  imports:[ TypeOrmModule.forFeature([Usuarios]),],
  exports:[UsuariosService]
})
export class UsuariosModule {}
