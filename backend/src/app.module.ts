import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ContactModule } from './modules/contact/contact.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { ServicesModule } from './modules/services/services.module';
import { ChatModule } from './modules/chat/chat.module';
import { AuthModule } from './modules/auth/auth.module';
import { AboutModule } from './modules/about/about.module';
import { NewsModule } from './modules/news/news.module';
import { UploadModule } from './modules/upload/upload.module';
import { SearchModule } from './modules/search/search.module';
import { GalleryModule } from './modules/gallery/gallery.module';
import { HomeModule } from './modules/home/home.module';
import { UnansweredQueriesModule } from './modules/unanswered-queries/unanswered-queries.module';
import { ContactSubmission } from './entities/contact-submission.entity';
import { Project } from './entities/project.entity';
import { Service } from './entities/service.entity';
import { AboutSection } from './entities/about-section.entity';
import { News } from './entities/news.entity';
import { Gallery } from './entities/gallery.entity';
import { HomeSection } from './entities/home-content.entity';
import { UnansweredQuery } from './entities/unanswered-query.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 60 }]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE', 'bykm_trading'),
        entities: [ContactSubmission, Project, Service, AboutSection, News, HomeSection, Gallery, UnansweredQuery],
        synchronize: configService.get('NODE_ENV') !== 'production',
        logging: configService.get('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
    ContactModule,
    ProjectsModule,
    ServicesModule,
    ChatModule,
    AuthModule,
    AboutModule,
    NewsModule,
    UploadModule,
    SearchModule,
    HomeModule,
    GalleryModule,
    UnansweredQueriesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
