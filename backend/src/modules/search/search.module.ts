import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { News } from '../../entities/news.entity';
import { Project } from '../../entities/project.entity';
import { Service } from '../../entities/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([News, Project, Service])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
