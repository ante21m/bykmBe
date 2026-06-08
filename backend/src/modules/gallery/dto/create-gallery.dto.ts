import {
  IsString, IsOptional, IsBoolean, IsNumber, MinLength,
} from 'class-validator';

export class CreateGalleryDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsOptional()
  @IsString()
  titleAm?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  descAm?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}
