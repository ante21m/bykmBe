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
import { HomeService } from './home.service';
import { CreateHomeSectionDto } from './dto/create-home.dto';
import { UpdateHomeSectionDto } from './dto/update-home.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('home')
@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  @ApiOperation({ summary: 'Get all home sections' })
  findAll() {
    return this.homeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get home section by ID' })
  findOne(@Param('id') id: string) {
    return this.homeService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create home section' })
  create(@Body() dto: CreateHomeSectionDto) {
    return this.homeService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update home section' })
  update(@Param('id') id: string, @Body() dto: UpdateHomeSectionDto) {
    return this.homeService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete home section' })
  remove(@Param('id') id: string) {
    return this.homeService.remove(id);
  }
}
