import { IsString, IsOptional, IsArray, IsBoolean, IsNumber, MinLength } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @MinLength(1)
  pillarKey: string;

  @IsOptional()
  @IsString()
  pillarTitle?: string;

  @IsOptional()
  @IsString()
  pillarTitleAm?: string;

  @IsOptional()
  @IsString()
  pillarDescription?: string;

  @IsOptional()
  @IsString()
  pillarDescriptionAm?: string;

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
  descriptionAm?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  features?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  featuresAm?: string[];

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsNumber()
  sortOrder?: number;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
