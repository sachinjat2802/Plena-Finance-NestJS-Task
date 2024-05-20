import { Controller, Get, Post, Body, Param, Patch, Req, UseGuards, HttpStatus, Res } from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { ValidateTokenDto } from './dto/validate-token.dto';
import { Response } from 'express';
import { RateLimitGuard } from '../common/guards/rate-limit.guard';
import { RateLimit } from '../common/decorators/rate-limit.decorator';

@Controller('tokens')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post()
  async create(@Body() createTokenDto: CreateTokenDto) {
    return this.tokenService.create(createTokenDto);
  }

  @UseGuards(RateLimitGuard)
  @RateLimit(100)
  @Get('info')
  async getTokenInfo(@Req() req: any, @Res() res: Response) {
    const accessKey = req.headers['x-access-key'];
    if (!accessKey || Array.isArray(accessKey)) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Invalid access key' });
    }

    const validation = await this.tokenService.validateKey(accessKey as string);
    if (!validation.isValid) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid or expired access key' });
    }

    const tokenInfo = await this.tokenService.getTokenInfo(accessKey as string);
    return res.status(HttpStatus.OK).json(tokenInfo);
  }
}
