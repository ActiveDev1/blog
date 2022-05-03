import { Injectable } from '@nestjs/common'
import { Redis } from 'ioredis'
import { RedisService as RedisServiceProvider } from 'nestjs-redis'
import { config } from '../config'

@Injectable()
export class RedisService {
	private redisClient: Redis
	constructor(private readonly redisService: RedisServiceProvider) {
		this.redisClient = this.redisService.getClient()
	}

	async addSignupCode(email: string, code: number): Promise<void> {
		await this.redisClient.set(
			this.getVerificationEmailCodeKey(email),
			code,
			'EX',
			config.settings.signupCodeExpireTime
		)
	}

	private getVerificationEmailCodeKey(email: string) {
		return 'vce_' + email
	}
}
