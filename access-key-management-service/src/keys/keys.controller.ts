import { Controller, Get, Patch, Headers } from '@nestjs/common';
import { KeysService } from './keys.service';

@Controller('keys')
export class KeysController {
  constructor(private readonly keysService: KeysService) {}

  @Get()
  getKeyDetails(@Headers('x-access-key') key: string) {
    return this.keysService.getKeyDetails(key);
  }

  @Patch('disable')
  disableKey(@Headers('x-access-key') key: string) {
    return this.keysService.disableKey(key);
  }
}
