import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { KeysModule } from './keys/keys.module';
import { Key } from './keys/entities/key.entity';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Key],
      synchronize: true,
    }),
    AdminModule,
    KeysModule,
    RedisModule,
  ],
})
export class AppModule {}
