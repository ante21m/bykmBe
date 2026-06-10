import { IsString, IsOptional, IsArray, IsBoolean, IsNumber, MinLength } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @MinLength(1)
  pillarKey: string;

  @IsString()
  @MinLength(1)
  pillarTitle: string;

  @IsString()
  @MinLength(1)
  pillarDescription: string;

  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @MinLength(1)
  description: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  features?: string[];

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
