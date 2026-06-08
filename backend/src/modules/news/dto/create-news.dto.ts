import {
  IsString, IsOptional, IsBoolean, IsNumber, MinLength,
} from 'class-validator';

export class CreateNewsDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsOptional()
  @IsString()
  titleAm?: string;

  @IsString()
  @MinLength(1)
  excerpt: string;

  @IsOptional()
  @IsString()
  excerptAm?: string;

  @IsString()
  @MinLength(1)
  content: string;

  @IsOptional()
  @IsString()
  contentAm?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  fileUrl?: string;

  @IsOptional()
  @IsString()
  fileName?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  authorAm?: string;

  @IsOptional()
  @IsString()
  tags?: string;

  @IsOptional()
  @IsString()
  sourceUrl?: string;

  @IsOptional()
  @IsNumber()
  views?: number;

  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}
