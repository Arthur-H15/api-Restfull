import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  
  
  const app = await NestFactory.create(AppModule);
   app.listen(3000).then(()=>console.log('escutando na porta 3000'));
}
bootstrap();
