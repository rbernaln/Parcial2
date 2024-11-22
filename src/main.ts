/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI, 
    prefix: 'api/v',          
    defaultVersion: '1',      
  });

  // Habilitar validación global
  app.useGlobalPipes(new ValidationPipe());

  // Configuración de puerto y escucha en localhost:3000
  await app.listen(process.env.PORT ?? 3000);
  console.log('Aplicación NestJS escuchando en http://localhost:3000');
}
bootstrap();
