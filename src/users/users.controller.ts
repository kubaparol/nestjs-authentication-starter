import { Controller, Get, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { Swagger } from '@decorators';
import { MeResponse } from './responses';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Swagger({
    operation: {
      summary: 'Get me',
      description: 'Get the current user',
    },
    responses: [
      { status: 200, description: 'User found', type: MeResponse },
      { status: 401, description: 'Unauthorized' },
      { status: 404, description: 'User not found' },
    ],
  })
  @Get('me')
  async getMe(@Req() req: Request): Promise<MeResponse> {
    return await this.usersService.getMe(req.user.sub);
  }
}
