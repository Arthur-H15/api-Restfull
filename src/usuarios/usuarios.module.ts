import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from 'src/entities/Usuarios';
import { UsuariosAssets } from './usuarios.assets';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService,UsuariosAssets],
  imports:[ TypeOrmModule.forFeature([Usuarios]),],
  exports:[UsuariosService,UsuariosAssets]
})
export class UsuariosModule {}
