import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { SignInDto, SignUpDto } from './dto';
import { AccessTokenUserInfo, AccessTokenResponse } from './types';
import type { User } from '@prisma/client';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(dto: SignInDto): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const pwMatches = await argon.verify(user.hash, dto.password);

    if (!pwMatches)
      throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);

    return user;
  }

  async signIn(dto: SignInDto): Promise<AccessTokenResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    const payload: AccessTokenUserInfo = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(dto: SignUpDto): Promise<AccessTokenResponse> {
    const hash = await argon.hash(dto.password);

    try {
      await this.prisma.user.create({
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          email: dto.email,
          hash,
        },
      });

      return this.signIn({ email: dto.email, password: dto.password });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException(
            'User already exists',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      throw error;
    }
  }
}
