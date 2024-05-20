import { Injectable } from '@nestjs/common';
import { CreateKeyDto } from 'src/keys/dto/create-key.dto';
import { UpdateKeyDto } from 'src/keys/dto/update-key.dto';
import { KeysService } from 'src/keys/keys.service';

@Injectable()
export class AdminService {
  constructor(private readonly keysService: KeysService) {}

  createKey(createKeyDto: CreateKeyDto) {
    return this.keysService.createKey(createKeyDto);
  }

  deleteKey(id: string) {
    return this.keysService.deleteKey(id);
  }

  listKeys() {
    return this.keysService.listKeys();
  }

  updateKey(id: string, updateKeyDto: UpdateKeyDto) {
    return this.keysService.updateKey(id, updateKeyDto);
  }
}
