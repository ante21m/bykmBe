import { Controller, Post, Body, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto) {
    const adminUsername = this.configService.get<string>('ADMIN_USERNAME', 'admin');
    const adminPassword = this.configService.get<string>('ADMIN_PASSWORD', 'admin123');
    if (dto.username !== adminUsername || dto.password !== adminPassword) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const token = this.jwtService.sign({ role: 'admin', username: dto.username });
    return { token };
  }
}
