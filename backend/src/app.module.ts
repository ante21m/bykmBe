import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
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
import { TeamModule } from './modules/team/team.module';
import { buildTypeOrmOptions } from './database/typeorm-options';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 60 }]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        buildTypeOrmOptions(configService),
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
    TeamModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
