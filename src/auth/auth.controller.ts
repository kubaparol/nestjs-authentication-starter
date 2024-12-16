import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards';
import { Public } from './decorators';
import { SignUpDto, SignInDto } from './dtos';
import { AccessTokenResponse } from './responses';
import { ApiTags } from '@nestjs/swagger';
import { Swagger } from '@decorators';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Swagger({
    operation: {
      summary: 'Sign in',
      description: 'Sign in to the application',
    },
    responses: [
      {
        status: 201,
        description: 'Sign in successful',
        type: AccessTokenResponse,
      },
      { status: 404, description: 'User not found' },
      { status: 401, description: 'Invalid password' },
      { status: 400, description: 'Bad request' },
    ],
  })
  @UseGuards(LocalGuard)
  @Post('signin')
  async signin(@Body() dto: SignInDto): Promise<AccessTokenResponse> {
    return this.authService.signIn(dto);
  }

  @Public()
  @Swagger({
    operation: {
      summary: 'Sign up',
      description: 'Sign up for the application',
    },
    responses: [
      {
        status: 201,
        description: 'Sign up successful',
        type: AccessTokenResponse,
      },
      { status: 400, description: 'Bad request' },
    ],
  })
  @Post('signup')
  async signup(@Body() dto: SignUpDto): Promise<AccessTokenResponse> {
    return this.authService.signUp(dto);
  }
}
