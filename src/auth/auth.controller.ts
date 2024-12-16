import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards';
import { Public } from './decorators';
import { SignUpDto, SignInDto } from './dtos';
import { AccessTokenResponse } from './responses';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @ApiOperation({
    summary: 'Sign in',
    description: 'Sign in to the application',
  })
  @ApiResponse({
    status: 201,
    description: 'Sign in successful',
    type: AccessTokenResponse,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 401, description: 'Invalid password' })
  @ApiResponse({ status: 400, description: 'Bad request' })
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
