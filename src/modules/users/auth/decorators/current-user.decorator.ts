import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface AuthPayload {
  userId: number;
  role: 'admin' | 'client';
}

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): AuthPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);