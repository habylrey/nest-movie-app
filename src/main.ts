import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config/dist';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService); 
  app.useGlobalPipes(new ValidationPipe({
    transform: true,  
    whitelist: false,  
    forbidNonWhitelisted: true, 
  }));
  const port = configService.get<number>('PORT'); 
  await app.listen(port);
}
bootstrap();
