import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  
  
  const app = await NestFactory.create(AppModule);
  app.use(cors())
  const config = new DocumentBuilder()
    .setTitle('Usuario API')
    .setDescription('API criada para criar, excluir,editar,e visualizar  Usuarios')
    .setVersion('1.0')
    .addTag('Usuarios')
    .addBearerAuth({type:'http',scheme:'bearer',bearerFormat:'JWT'})
    .build();
  const documento = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('documento',app,documento)
   app.listen(3000).then(()=>console.log('escutando na porta 3000'));
}
bootstrap();
