import {
  Controller, Get, Post, Put, Delete, Body, Param, Query, Req,
  HttpCode, HttpStatus, UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all news' })
  @ApiQuery({ name: 'active', required: false })
  findAll(@Query('active') active?: string) {
    const activeBool = active === 'true' ? true : active === 'false' ? false : undefined;
    return this.newsService.findAll(activeBool);
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured news' })
  findFeatured() {
    return this.newsService.findFeatured();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get news by ID' })
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a news article' })
  create(@Body() dto: CreateNewsDto, @Req() req: Request) {
    const user = (req as any).user;
    return this.newsService.create({ ...dto, author: dto.author || user?.username });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a news article' })
  update(@Param('id') id: string, @Body() dto: UpdateNewsDto) {
    return this.newsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a news article' })
  remove(@Param('id') id: string) {
    return this.newsService.remove(id);
  }
}
