import {
  Controller, Get, Post, Put, Delete, Body, Param, Query,
  HttpCode, HttpStatus, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { TeamService } from './team.service';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('team')
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  @ApiOperation({ summary: 'Get all team members (admin)' })
  @ApiQuery({ name: 'category', required: false })
  findAll(@Query('category') category?: string) {
    return this.teamService.findAll(category);
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active team members (public)' })
  @ApiQuery({ name: 'category', required: false })
  findActive(@Query('category') category?: string) {
    return this.teamService.findActive(category);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get team member by ID' })
  findOne(@Param('id') id: string) {
    return this.teamService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a team member' })
  create(@Body() dto: CreateTeamMemberDto) {
    return this.teamService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a team member' })
  update(@Param('id') id: string, @Body() dto: UpdateTeamMemberDto) {
    return this.teamService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a team member' })
  remove(@Param('id') id: string) {
    return this.teamService.remove(id);
  }
}
