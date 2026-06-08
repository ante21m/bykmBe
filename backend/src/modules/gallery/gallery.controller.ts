import {
  Controller, Get, Post, Put, Delete, Body, Param, Query,
  HttpCode, HttpStatus, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('gallery')
@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get()
  @ApiOperation({ summary: 'Get all gallery items' })
  findAll(@Query('active') active?: string) {
    const activeBool = active === 'true' ? true : active === 'false' ? false : undefined;
    return this.galleryService.findAll(activeBool);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get gallery item by ID' })
  findOne(@Param('id') id: string) {
    return this.galleryService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a gallery item' })
  create(@Body() dto: CreateGalleryDto) {
    return this.galleryService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a gallery item' })
  update(@Param('id') id: string, @Body() dto: UpdateGalleryDto) {
    return this.galleryService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a gallery item' })
  remove(@Param('id') id: string) {
    return this.galleryService.remove(id);
  }
}
