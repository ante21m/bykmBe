import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AboutService } from './about.service';
import { CreateAboutSectionDto } from './dto/create-about.dto';
import { UpdateAboutSectionDto } from './dto/update-about.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('about')
@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get()
  @ApiOperation({ summary: 'Get all about sections' })
  findAll() {
    return this.aboutService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get about section by ID' })
  findOne(@Param('id') id: string) {
    return this.aboutService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create about section' })
  create(@Body() dto: CreateAboutSectionDto) {
    return this.aboutService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update about section' })
  update(@Param('id') id: string, @Body() dto: UpdateAboutSectionDto) {
    return this.aboutService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete about section' })
  remove(@Param('id') id: string) {
    return this.aboutService.remove(id);
  }
}
