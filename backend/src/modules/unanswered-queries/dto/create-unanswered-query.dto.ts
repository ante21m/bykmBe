import { IsNotEmpty, IsString, IsOptional, MaxLength, MinLength } from 'class-validator';

export class CreateUnansweredQueryDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(500)
  query: string;

  @IsOptional()
  @IsString()
  lang?: string;
}
