import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenValidationService {
  private keys = [
    { key: 'valid-key', rateLimit: 100, expiration: '2024-12-31T23:59:59.000Z', requests: 0 }
  ];

  async validateKey(key: string) {
    const foundKey = this.keys.find(k => k.key === key);
    if (!foundKey) {
      return { isValid: false, message: 'Invalid key', isRateLimited: false };
    }

    if (new Date(foundKey.expiration) < new Date()) {
      return { isValid: false, message: 'Key expired', isRateLimited: false };
    }

    foundKey.requests += 1;

    if (foundKey.requests > foundKey.rateLimit) {
      return { isValid: true, message: 'Valid key', isRateLimited: true };
    }

    return { isValid: true, message: 'Valid key', isRateLimited: false };
  }
}
