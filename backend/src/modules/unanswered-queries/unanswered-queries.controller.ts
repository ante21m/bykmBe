import {
  Controller, Get, Post, Delete, Body, Param, Query,
  HttpCode, HttpStatus, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UnansweredQueriesService } from './unanswered-queries.service';
import { CreateUnansweredQueryDto } from './dto/create-unanswered-query.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('unanswered-queries')
@Controller('unanswered-queries')
export class UnansweredQueriesController {
  constructor(private readonly service: UnansweredQueriesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Log an unanswered chat query' })
  create(@Body() dto: CreateUnansweredQueryDto) {
    return this.service.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all unanswered queries (admin)' })
  findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.service.findAll(page ? +page : 1, limit ? +limit : 20);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an unanswered query' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
