import { Controller, Get, Req, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { TokenValidationService } from '../services/tokenValidation.service';

@Controller('token-info')
export class TokenInfoController {
  constructor(private readonly tokenValidationService: TokenValidationService) {}

  @Get()
  async getTokenInfo(@Req() req, @Res() res) {
    const accessKey = req.headers['x-access-key'];
    const validation = await this.tokenValidationService.validateKey(accessKey);

    if (!validation.isValid) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: validation.message });
    }

    if (validation.isRateLimited) {
      return res.status(HttpStatus.TOO_MANY_REQUESTS).json({ message: 'Rate limit exceeded' });
    }

    const tokenInfo = {
      token: 'mockToken',
      user: 'mockUser',
      permissions: ['read', 'write'],
    };

    res.status(HttpStatus.OK).json(tokenInfo);
  }
}
