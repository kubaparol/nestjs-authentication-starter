import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards';
import { Public } from './decorators';
import { SignUpDto, SignInDto } from './dto';
import { AccessTokenResponse } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalGuard)
  @Post('signin')
  async signin(@Body() dto: SignInDto): Promise<AccessTokenResponse> {
    return this.authService.signIn(dto);
  }

  @Public()
  @Post('signup')
  async signup(@Body() dto: SignUpDto): Promise<AccessTokenResponse> {
    return this.authService.signUp(dto);
  }
}
