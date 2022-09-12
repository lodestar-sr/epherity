import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { AppService } from './app.service';

function setupSwagger(app: INestApplication): void {
  const documentBuilder = new DocumentBuilder()
    .setTitle('Secret Note')
    .setDescription('API Server for CRUD secret note.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('api/docs', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api');
  setupSwagger(app);
  await app.listen(AppService.port());
}
bootstrap();
