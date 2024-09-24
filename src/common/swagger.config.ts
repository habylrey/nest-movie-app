import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
export const swaggerConfig = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('admin') 
    .build();
