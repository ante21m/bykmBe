import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ServicesDataService } from './services.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesDataService) {}

  @Get()
  @ApiOperation({ summary: 'Get all services, optionally filtered by pillar' })
  @ApiQuery({ name: 'pillarKey', required: false })
  findAll(@Query('pillarKey') pillarKey?: string) {
    return this.servicesService.findAll(pillarKey);
  }

  @Get('pillars')
  @ApiOperation({ summary: 'Get unique business pillars' })
  findPillars() {
    return this.servicesService.findPillars();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get service by ID' })
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a service' })
  create(@Body() data: any) {
    return this.servicesService.create(data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a service' })
  update(@Param('id') id: string, @Body() data: any) {
    return this.servicesService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a service' })
  remove(@Param('id') id: string) {
    return this.servicesService.remove(id);
  }
}
