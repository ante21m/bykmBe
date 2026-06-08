import { IsString, IsOptional, IsBoolean, IsNumber, MinLength } from 'class-validator';

export class CreateAboutSectionDto {
  @IsString()
  @MinLength(1)
  sectionKey: string;

  @IsString()
  @MinLength(1)
  title: string;

  @IsOptional()
  @IsString()
  titleAm?: string;

  @IsString()
  @MinLength(1)
  content: string;

  @IsOptional()
  @IsString()
  contentAm?: string;

  @IsOptional()
  @IsNumber()
  sortOrder?: number;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
