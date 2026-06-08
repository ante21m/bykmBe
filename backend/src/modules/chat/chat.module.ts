import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { UnansweredQuery } from '../../entities/unanswered-query.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UnansweredQuery])],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
