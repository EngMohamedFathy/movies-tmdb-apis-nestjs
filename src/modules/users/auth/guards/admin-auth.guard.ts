import { Injectable, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';

@Injectable()
export class AdminAuthGuard extends JwtAuthGuard {
  handleRequest(err, user, info, context: ExecutionContext) {
    if (err || !user) throw err || new ForbiddenException('Unauthorized');
    if (user.role !== 'admin') throw new ForbiddenException('Admins only');

    return user;
  }
}
