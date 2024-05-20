import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Key } from './entities/key.entity';
import { RedisService } from '../redis/redis.service';
import { CreateKeyDto } from './dto/create-key.dto';
import { UpdateKeyDto } from './dto/update-key.dto';

@Injectable()
export class KeysService {
  constructor(
    @InjectRepository(Key)
    private readonly keyRepository: Repository<Key>,
    private readonly redisService: RedisService,
  ) {}

  async createKey(createKeyDto: CreateKeyDto): Promise<Key> {
    const key = this.keyRepository.create({
      ...createKeyDto,
      key: this.generateRandomKey(),
    });
    await this.keyRepository.save(key);
    await this.redisService.publish('key-events', { type: 'CREATE', key });
    return key;
  }

  async deleteKey(id: string): Promise<void> {
    await this.keyRepository.delete(id);
    await this.redisService.publish('key-events', { type: 'DELETE', id });
  }

  async listKeys(): Promise<Key[]> {
    return this.keyRepository.find();
  }

  async updateKey(id: string, updateKeyDto: UpdateKeyDto): Promise<Key> {
    await this.keyRepository.update(id, updateKeyDto);
    const updatedKey = await this.keyRepository.findOne({ where: { id } });
    await this.redisService.publish('key-events', { type: 'UPDATE', key: updatedKey });
    return updatedKey;
  }

  async getKeyDetails(key: string): Promise<Key> {
    return this.keyRepository.findOne({ where: { key } });
  }

  async disableKey(key: string): Promise<void> {
    await this.keyRepository.update({ key }, { isActive: false });
    await this.redisService.publish('key-events', { type: 'DISABLE', key });
  }

  private generateRandomKey(): string {
    return Math.random().toString(36).substring(2);
  }
}
