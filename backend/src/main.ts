import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(helmet({
    crossOriginResourcePolicy: {
      policy: 'cross-origin',
    },
  }));

  const frontendUrl = process.env.FRONTEND_URL;
  const origins: string[] = [ 
    'https://backoffice.bykmgroup.com',
    'https://bykmgroup.com'];
  if (frontendUrl) origins.push(frontendUrl);
  if (process.env.NODE_ENV !== 'production') {
    origins.push('http://localhost:3000');
  }

  app.enableCors({
    origin: origins.length > 0 ? origins : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix('api');

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('BYKM Trading PLC API')
      .setDescription('REST API for BYKM Trading PLC Website')
      .setVersion('1.0')
      .addTag('contact', 'Contact form submissions')
      .addTag('projects', 'Company projects and portfolio')
      .addTag('services', 'Business services and pillars')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  const port = process.env.PORT || 3001;
  await app.listen(port);
}
bootstrap();
