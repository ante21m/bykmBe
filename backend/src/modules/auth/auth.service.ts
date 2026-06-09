import { Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { User } from '../../entities/user.entity';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    await this.seedAdmin();
  }

  private async seedAdmin() {
    const count = await this.userRepository.count();
    if (count > 0) return;

    const username = this.configService.get<string>('ADMIN_USERNAME', 'admin');
    const password = this.configService.get<string>('ADMIN_PASSWORD', 'admin123');
    const hashed = await bcrypt.hash(password, 10);

    const user = new User();
    user.id = uuidv4();
    user.username = username;
    user.password = hashed;
    user.role = 'admin';
    await this.userRepository.save(user);
    console.log(`✅ Default admin user seeded (username: ${username})`);
  }

  async login(username: string, password: string) {
    const user = await this.userRepository.findOne({ where: { username, active: true } });
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const token = this.jwtService.sign({ role: user.role, username: user.username, sub: user.id });
    return { token };
  }

  async setupAdmin() {
    const username = this.configService.get<string>('ADMIN_USERNAME', 'admin');
    const password = this.configService.get<string>('ADMIN_PASSWORD', 'admin123');
    const hashed = await bcrypt.hash(password, 10);

    let user = await this.userRepository.findOne({ where: { username } });
    if (user) {
      user.password = hashed;
      await this.userRepository.save(user);
    } else {
      user = new User();
      user.id = uuidv4();
      user.username = username;
      user.password = hashed;
      user.role = 'admin';
      await this.userRepository.save(user);
    }

    return { message: `Admin user "${username}" updated` };
  }
}
