import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Key } from '../keys/entities/key.entity';
import { KeysService } from '../keys/keys.service';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [TypeOrmModule.forFeature([Key]), RedisModule],
  controllers: [AdminController],
  providers: [AdminService, KeysService],
})
export class AdminModule {}
