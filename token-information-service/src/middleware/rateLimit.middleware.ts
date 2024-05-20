import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TokenValidationService } from '../services/tokenValidation.service';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  constructor(private readonly tokenValidationService: TokenValidationService) {}

    async use(req: Request, res: Response, next: NextFunction) {
      //find access key from headers 
    const accessKey = req.headers['x-access-key'].toString();
    const validation = await this.tokenValidationService.validateKey(accessKey);

    if (!validation.isValid) {
      return res.status(401).json({ message: validation.message });
    }

    if (validation.isRateLimited) {
      return res.status(429).json({ message: 'Rate limit exceeded' });
    }

    next();
  }
}
