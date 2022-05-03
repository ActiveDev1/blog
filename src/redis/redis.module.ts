import { Module } from '@nestjs/common'
import { RedisModule as _RedisModule } from 'nestjs-redis'
import { redisConfig } from '../config'
import { RedisService } from './redis.service'

@Module({
	imports: [_RedisModule.register(redisConfig)],
	providers: [RedisService],
	exports: [RedisService]
})
export class RedisModule {}
