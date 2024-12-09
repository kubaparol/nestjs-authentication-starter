import {
  BadRequestException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { SignInDto } from '../dto';
import { validate } from 'class-validator';

@Injectable()
export class LocalGuard extends AuthGuard('local') {
  constructor() {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();

    const body = plainToClass(SignInDto, request.body);
    const errors = await validate(body);

    const errorMessages = errors.flatMap(({ constraints }) =>
      Object.values(constraints),
    );

    if (errors.length > 0) throw new BadRequestException(errorMessages);

    return super.canActivate(context) as boolean | Promise<boolean>;
  }
}
