import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TokenValidationService } from '../services/tokenValidation.service';
export declare class RateLimitMiddleware implements NestMiddleware {
    private readonly tokenValidationService;
    constructor(tokenValidationService: TokenValidationService);
    use(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
