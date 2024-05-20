import { Injectable } from '@nestjs/common';
import { Redis as RedisClient } from 'ioredis';
import { promisify } from 'util';

@Injectable()
export class RedisService {
  private client: RedisClient;
  private publisher: RedisClient;
  private subscriber: RedisClient;

  constructor() {
    this.client = new RedisClient({ host: process.env.REDIS_HOST, port: parseInt(process.env.REDIS_PORT, 10) });
    this.publisher = new RedisClient({ host: process.env.REDIS_HOST, port: parseInt(process.env.REDIS_PORT, 10) });
    this.subscriber = new RedisClient({ host: process.env.REDIS_HOST, port: parseInt(process.env.REDIS_PORT, 10) });
  }

  async publish(channel: string, message: any): Promise<void> {
    const publishAsync = promisify(this.publisher.publish).bind(this.publisher);
    await publishAsync(channel, JSON.stringify(message));
  }

  async subscribe(channel: string, handler: (message: any) => void): Promise<void> {
    this.subscriber.subscribe(channel);
    this.subscriber.on('message', (chan, message) => {
      if (chan === channel) {
        handler(JSON.parse(message));
      }
    });
  }
}
