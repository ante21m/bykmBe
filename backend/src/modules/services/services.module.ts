import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesController } from './services.controller';
import { ServicesDataService } from './services.service';
import { Service } from '../../entities/service.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Service]), AuthModule],
  controllers: [ServicesController],
  providers: [ServicesDataService],
  exports: [ServicesDataService],
})
export class ServicesModule {}
