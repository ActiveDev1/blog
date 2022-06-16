import { Injectable, NotAcceptableException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as _ from 'lodash'
import { UserNotFound } from '../../shared/errors/user-not-found'
import { MailService } from '../../modules/services/mail/mail.service'
import { RedisService } from '../../modules/services/redis/redis.service'
import { refreshTokenConfig } from '../../shared/config'
import * as argon2 from '../../shared/utils/argon2'
import {
	emailMask,
	generateRandomName,
	generateSignupCode,
	generateUsernameFromEmail
} from '../../shared/utils/helpers/functions'
import { UserPersonalData } from '../user/interfaces/create-user.interface'
import { UserRepository } from '../user/users.repository'
import { GetEmailCodeDto } from './dtos/get-email-code.dto'
import { GetEmailPassDto } from './dtos/get-email-pass.dto'
import { GetEmailVerificationDto } from './dtos/get-email-verification.dto'
import { GetEmailDto } from './dtos/get-email.dto'
import { GetUsernameDto } from './dtos/get-username.dto'
import { Tokens } from './dtos/tokens.dto'
import { WrongEmailPass } from './errors/wrong-email-password'
import { WrongVerificationCode } from './errors/wrong-verification-code'
import { EmailVerification } from './interfaces/email-verification.interface'
import { JwtPayload } from './interfaces/jwt-payload.interface'
import { UserExistence } from './interfaces/user-existence.interface'

@Injectable()
export class AuthService {
	constructor(
		private userRepository: UserRepository,
		private redisService: RedisService,
		private jwtService: JwtService,
		private mailService: MailService
	) {}

	async sendVerificationCode(body: GetEmailDto): Promise<void> {
		const { email } = body
		const signupCode = generateSignupCode()
		await Promise.all([
			this.redisService.addVerificationCode(email, signupCode),
			this.mailService.sendUserConfirmation({ receiver: { email }, code: signupCode })
		])
	}

	async signup(body: GetEmailVerificationDto): Promise<Tokens> {
		const { email } = body

		if (await this.checkVerificationCode(body)) {
			throw new WrongVerificationCode()
		}

		const name = generateRandomName()
		const username = generateUsernameFromEmail(email)
		const newUser: UserPersonalData = { email, username, name }
		const user = await this.userRepository.create(newUser)

		return this.sendAuthorizedMessage(user.id)
	}

	async loginWithPassword(body: GetEmailPassDto): Promise<Tokens> {
		const { email, password } = body
		const user = await this.userRepository.findById(email)

		if (_.isNil(user?.password)) {
			throw new NotAcceptableException()
		}

		if (!user || !(await argon2.verifyPassword(user.password, password))) {
			throw new WrongEmailPass()
		}

		return this.sendAuthorizedMessage(user.id)
	}

	async loginWithCode(body: GetEmailCodeDto): Promise<Tokens> {
		const user = await this.userRepository.findByEmail(body.email)
		if (!user) {
			throw new UserNotFound()
		}

		if (this.checkVerificationCode(body)) {
			throw new WrongVerificationCode()
		}

		return this.sendAuthorizedMessage(user.id)
	}

	async verifyRefreshToken(userId: string): Promise<Tokens> {
		return this.sendAuthorizedMessage(userId)
	}

	async checkUserExistence({ username }: GetUsernameDto) {
		const user = await this.userRepository.findByUsername(username)
		const userExist = user ? true : false
		const data: UserExistence = {
			userExistence: userExist,
			verifyOptions: userExist
				? {
						email: emailMask(user.email),
						password: _.isNil(user.password) ? false : true
				  }
				: undefined
		}
		return data
	}

	async checkVerificationCode({ email, code }: EmailVerification) {
		const emailVerificationCode = await this.redisService.getVerificationCode(email)
		return !(emailVerificationCode === code)
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
