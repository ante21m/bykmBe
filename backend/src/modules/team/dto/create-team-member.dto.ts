import {
  IsString, IsOptional, IsBoolean, IsNumber, MinLength, IsArray, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class EducationDto {
  @IsString()
  degree: string;

  @IsString()
  institution: string;

  @IsOptional()
  @IsString()
  year?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

class ExperienceDto {
  @IsString()
  role: string;

  @IsString()
  organization: string;

  @IsOptional()
  @IsString()
  startYear?: string;

  @IsOptional()
  @IsString()
  endYear?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

class CertificateDto {
  @IsString()
  name: string;

  @IsString()
  issuer: string;

  @IsOptional()
  @IsString()
  year?: string;

  @IsOptional()
  @IsString()
  url?: string;
}

class AwardDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  year?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateTeamMemberDto {
  @IsString()
  @MinLength(1)
  nameEn: string;

  @IsOptional()
  @IsString()
  nameAm?: string;

  @IsString()
  @MinLength(1)
  titleEn: string;

  @IsOptional()
  @IsString()
  titleAm?: string;

  @IsString()
  @MinLength(1)
  descEn: string;

  @IsOptional()
  @IsString()
  descAm?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsNumber()
  sortOrder?: number;

  @IsOptional()
  @IsString()
  linkedinUrl?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  education?: EducationDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExperienceDto)
  experience?: ExperienceDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CertificateDto)
  certificates?: CertificateDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AwardDto)
  awards?: AwardDto[];
}
