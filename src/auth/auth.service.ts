import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user && user.password === pass) {
      const { password, ...rest } = user; // eslint-disable-line @typescript-eslint/no-unused-vars

      return rest;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: any) {
    const existingUser = await this.usersService.findOne(user.username);

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    await this.usersService.create(user);

    return this.login(user);
  }
}
