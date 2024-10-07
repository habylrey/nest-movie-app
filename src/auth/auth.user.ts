import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { Person } from '../common/interfaces/request.interface';
import { AuthRequest } from '../common/interfaces/request.interface';

export const AuthUser = createParamDecorator((data: unknown, ctx: ExecutionContext): Person => {
  return ctx.switchToHttp().getRequest<AuthRequest>().user;
});

