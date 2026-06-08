import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnansweredQueriesController } from './unanswered-queries.controller';
import { UnansweredQueriesService } from './unanswered-queries.service';
import { UnansweredQuery } from '../../entities/unanswered-query.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UnansweredQuery]), AuthModule],
  controllers: [UnansweredQueriesController],
  providers: [UnansweredQueriesService],
  exports: [UnansweredQueriesService],
})
export class UnansweredQueriesModule {}
