import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { InquiryType } from 'src/entities/contact-submission.entity';
// import { InquiryType } from '../../entities/contact-submission.entity';

export class CreateContactDto {
  @ApiProperty({ example: 'Abebe', description: 'First name' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  firstName: string;

  @ApiProperty({ example: 'Kebede', description: 'Last name' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  lastName: string;

  @ApiProperty({ example: 'abebe@example.com' })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiPropertyOptional({ example: '+251911343290' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @ApiPropertyOptional({ example: 'Ethio Agri-CEFT' })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  organization?: string;

  @ApiPropertyOptional({ example: 'Ethiopia' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  country?: string;

  @ApiProperty({ enum: InquiryType, default: InquiryType.GENERAL })
  @IsEnum(InquiryType)
  inquiryType: InquiryType;

  @ApiProperty({ example: 'Partnership Inquiry' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  subject: string;

  @ApiProperty({ example: 'We would like to explore partnership opportunities...' })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  message: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  newsletterConsent?: boolean;
}
