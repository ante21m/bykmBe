import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import type { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // cPanel puts LiteSpeed in front of this process. Without this, req.ip
  // is the proxy's address, so the throttler rate-limits every visitor as
  // if they were one client.
  app.set('trust proxy', 1);

  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

  // Never let the browser or LiteSpeed cache an API response. This is the
  // header that stops a 500 being pinned in the edge cache for 30 days and
  app.use('/api', (req: Request, res: Response, next: NextFunction) => {
    if (!req.path.startsWith('/uploads')) {
      res.setHeader(
        'Cache-Control',
        'no-store, no-cache, must-revalidate, proxy-revalidate',
      );
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.setHeader('Surrogate-Control', 'no-store');
    }
    next();
  });

  const frontendUrl = process.env.FRONTEND_URL;
  const origins: string[] = [];
  const corsOrigins = process.env.CORS_ORIGINS;
  if (corsOrigins) {
    origins.push(...corsOrigins.split(',').map((o) => o.trim()).filter(Boolean));
  }
  if (frontendUrl) origins.push(frontendUrl);
  if (process.env.NODE_ENV !== 'production') {
    origins.push('http://localhost:3000', 'http://localhost:3002');
  }

  app.enableCors({
    origin: origins.length > 0 ? origins : '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
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

  // Every unhandled error becomes structured JSON and gets logged to
  // stderr, which is where cPanel surfaces it. Production was previously
  // silent, so a 500 arrived with no trace of its cause anywhere.
  app.useGlobalFilters(new AllExceptionsFilter());

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
