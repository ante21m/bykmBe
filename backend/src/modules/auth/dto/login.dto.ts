import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'admin', description: 'Admin username' })
  @IsString()
  @MinLength(1)
  username: string;

  @ApiProperty({ example: 'admin123', description: 'Admin password' })
  @IsString()
  @MinLength(1)
  password: string;
}
