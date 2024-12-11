import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Public } from './decorators/public.decorator';
import { SignUpDto, SignInDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalGuard)
  @Post('signin')
  async signin(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }

  @Public()
  @Post('signup')
  async signup(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }
}
