import { IsString, IsOptional, IsBoolean, IsNumber, IsEnum, MinLength } from 'class-validator';
import { ProjectPillar, ProjectStatus } from '../../../entities/project.entity';

export class CreateProjectDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsOptional()
  @IsString()
  titleAm?: string;

  @IsString()
  @MinLength(1)
  description: string;

  @IsOptional()
  @IsString()
  descAm?: string;

  @IsOptional()
  @IsString()
  scope?: string;

  @IsOptional()
  @IsString()
  scopeAm?: string;

  @IsOptional()
  @IsString()
  achievement?: string;

  @IsOptional()
  @IsString()
  achievAm?: string;

  @IsOptional()
  @IsString()
  impact?: string;

  @IsOptional()
  @IsString()
  impactAm?: string;

  @IsEnum(ProjectPillar)
  pillar: ProjectPillar;

  @IsEnum(ProjectStatus)
  status: ProjectStatus;

  @IsOptional()
  @IsString()
  client?: string;

  @IsOptional()
  @IsString()
  clientAm?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  locationAm?: string;

  @IsOptional()
  @IsNumber()
  startYear?: number;

  @IsOptional()
  @IsNumber()
  endYear?: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  kpis?: string;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}
