import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RATE_LIMIT_KEY } from '../decorators/rate-limit.decorator';
import { Request } from 'express';

@Injectable()
export class RateLimitGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const rateLimit = this.reflector.get<number>(RATE_LIMIT_KEY, context.getHandler());

    if (!rateLimit) {
      return true;
    }

    const accessKey = request.headers['x-access-key'] as string;

    // Implement rate limit check logic here
    // This is a placeholder example
    if (accessKey === 'exceeded-rate-limit') {
      throw new HttpException('Rate limit exceeded', HttpStatus.TOO_MANY_REQUESTS);
    }

    return true;
  }
}
