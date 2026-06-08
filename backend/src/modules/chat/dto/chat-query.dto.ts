import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ChatQueryDto {
  @ApiProperty({ example: 'What services does BYKM offer?', description: 'User message' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(500)
  message: string;

  @ApiPropertyOptional({ example: 'en', enum: ['en', 'am'], description: 'Response language (en=English, am=Amharic)' })
  @IsOptional()
  @IsString()
  lang?: 'en' | 'am';
}
