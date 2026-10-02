import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

  // The allowed origins are baked in rather than trusted to the environment.
  // When this ran on cPanel the env var was the only source of the allowlist,
  // and a trailing slash in it (or a missing var entirely) made every
  // preflight come back without Access-Control-Allow-Origin, which the
  // browser reports as a generic CORS error. Env can only add origins now.
  const origins: string[] = [];

  const corsOrigins = process.env.CORS_ORIGINS;
  if (corsOrigins) {
    origins.push(...corsOrigins.split(','));
  }
  const frontendUrl = process.env.FRONTEND_URL;
  if (frontendUrl) origins.push(frontendUrl);
  if (process.env.NODE_ENV !== 'production') {
    origins.push('http://localhost:3000', 'http://localhost:3002');
  }

  // Trailing slashes, casing and stray whitespace in the env var all used to
  // cause a silent mismatch, so every entry is canonicalised before matching.
  const patterns = Array.from(
    new Set(
      origins
        .map((o) => o.trim().replace(/\/+$/, '').toLowerCase())
        .filter((o) => o.length > 0 && o !== '*'),
    ),
  );

  app.enableCors({
    // A callback instead of an array so a rejected origin can be logged. cPanel
    // surfaces stderr, and "which origin is the browser actually sending?" is
    // otherwise impossible to answer from the outside.
    origin: (origin, callback) => {
      const requested = origin ? origin.trim().toLowerCase() : '';
      const allowed =
        requested === '' ||
        patterns.some((pattern) =>
          pattern.startsWith('*.')
            ? requested.endsWith(pattern.slice(1)) && requested !== pattern.slice(2)
            : requested === pattern,
        );
      if (!allowed) {
        console.warn(`[cors] rejected origin: ${origin}`);
      }
      callback(null, allowed);
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.enableCors({
  origin: 'https://bykmgroup.com',
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
