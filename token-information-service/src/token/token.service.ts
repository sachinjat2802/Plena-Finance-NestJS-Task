import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTokenDto } from './dto/create-token.dto';
import { Token } from './entities/token.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {}

  async create(createTokenDto: CreateTokenDto): Promise<Token> {
    const token = this.tokenRepository.create(createTokenDto);
    return this.tokenRepository.save(token);
  }

  async validateKey(key: string): Promise<{ isValid: boolean }> {
    const token = await this.tokenRepository.findOne({ where: { key } });
    if (!token) {
      return { isValid: false };
    }

    const now = new Date();
    if (token.expiration <= now) {
      return { isValid: false };
    }

    return { isValid: true };
  }

  async getTokenInfo(key: string): Promise<any> {
    const token = await this.tokenRepository.findOne({ where: { key } });
    if (!token) {
      throw new Error('Token not found');
    }

    return {
      token: token.key,
      rateLimit: token.rateLimit,
      expiration: token.expiration,
    };
  }
}
