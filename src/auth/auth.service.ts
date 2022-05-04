import { Injectable } from '@nestjs/common'
import { UserRepository } from '../user/users.repository'
import { MailService } from '../mail/mail.service'
import { RedisService } from '../redis/redis.service'
import {
	generateRandomUsername,
	generateSignupCode,
	generateUsernameFromEmail
} from '../common/utils/helpers/functions'
import { GetEmailDto } from './dtos/get-email.dto'
import { GetSignupVerificationDto } from './dtos/get-signup-verification.dto'
import { WrongVerificationCode } from './errors/wrong-verification-code'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './interfaces/jwt-payload.interface'
import { ICreateUser } from '../user/interfaces/create-user.interface'
import { refreshTokenConfig } from '../config'
import { Tokens } from './dtos/tokens.dto'

@Injectable()
export class AuthService {
	constructor(
		private userRepository: UserRepository,
		private redisService: RedisService,
		private jwtService: JwtService,
		private mailService: MailService
	) {}

	async sendSignupCode(getEmailDto: GetEmailDto): Promise<void> {
		const { email } = getEmailDto
		const signupCode = generateSignupCode()
		await Promise.all([
			this.redisService.addSignupCode(email, signupCode),
			this.mailService.sendUserConfirmation(email, signupCode)
		])
	}

	async signup(
		getSignupVerificationDto: GetSignupVerificationDto
	): Promise<Tokens> {
		const { email, code } = getSignupVerificationDto
		const emailVerificationCode = await this.redisService.getSignupCode(email)
		if (emailVerificationCode !== code) {
			throw new WrongVerificationCode()
		}

		const name = generateUsernameFromEmail(email)
		const username = generateRandomUsername()
		const userData: ICreateUser = { email, username, name }
		const user = await this.userRepository.upsert(userData)

		return this.sendAuthorizedMessage(user.id)
	}

	async verifyRefreshToken(userId: string): Promise<Tokens> {
		return this.sendAuthorizedMessage(userId)
	}

	private async sendAuthorizedMessage(userId: string): Promise<Tokens> {
		const payload: JwtPayload = { id: userId }
		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(payload),
			this.jwtService.signAsync(payload, {
				secret: refreshTokenConfig.secret,
				expiresIn: refreshTokenConfig.signOptions.expiresIn
			})
		])

		return { accessToken, refreshToken }
	}
}
