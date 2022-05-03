import { Injectable } from '@nestjs/common'
import { MailService } from '../mail/mail.service'
import { RedisService } from '../redis/redis.service'
import { generateSignupCode } from '../utils/helpers/functions'
import { GetEmailDto } from './dtos/get-email.dto'

@Injectable()
export class AuthService {
	constructor(
		private redisService: RedisService,
		private mailService: MailService
	) {}

	async sendSignupCode(getEmailDto: GetEmailDto): Promise<void> {
		const { email } = getEmailDto
		const signupCode = generateSignupCode()
		await this.redisService.addSignupCode(email, signupCode)
		await this.mailService.sendUserConfirmation(email, signupCode)
	}
}
