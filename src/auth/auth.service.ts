import { Injectable, NotAcceptableException } from '@nestjs/common'
import { UserRepository } from '../user/users.repository'
import { MailService } from '../mail/mail.service'
import { RedisService } from '../redis/redis.service'
import {
	emailMask,
	generateRandomName,
	generateSignupCode,
	generateUsernameFromEmail
} from '../common/utils/helpers/functions'
import { GetEmailDto } from './dtos/get-email.dto'
import { GetSignupVerificationDto } from './dtos/get-signup-verification.dto'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './interfaces/jwt-payload.interface'
import { UserExistence } from './interfaces/user-existence.interface'
import { UserPersonalData } from '../user/interfaces/create-user.interface'
import { refreshTokenConfig } from '../config'
import { Tokens } from './dtos/tokens.dto'
import { GetEmailPassDto } from './dtos/get-email-pass.dto'
import { WrongVerificationCode } from './errors/wrong-verification-code'
import { WrongEmailPass } from './errors/wrong-email-password'
import { GetEmailCodeDto } from './dtos/get-email-code.dto'
import { EmailVerification } from './interfaces/email-verification.interface'
import { UserNotFound } from 'src/shared/errors/user-not-found'
import { GetUsernameDto } from './dtos/get-username.dto'
import * as argon2 from '../common/utils/argon2'
import * as _ from 'lodash'

@Injectable()
export class AuthService {
	constructor(
		private userRepository: UserRepository,
		private redisService: RedisService,
		private jwtService: JwtService,
		private mailService: MailService
	) {}

	async sendVerificationCode(getEmailDto: GetEmailDto): Promise<void> {
		const { email } = getEmailDto
		const signupCode = generateSignupCode()
		await Promise.all([
			this.redisService.addVerificationCode(email, signupCode),
			this.mailService.sendUserConfirmation(email, signupCode)
		])
	}

	async signup(getSignupVerificationDto: GetSignupVerificationDto): Promise<Tokens> {
		const { email } = getSignupVerificationDto

		if (!this.checkVerificationCode(getSignupVerificationDto)) {
			throw new WrongVerificationCode()
		}

		const name = generateRandomName()
		const username = generateUsernameFromEmail(email)
		const newUser: UserPersonalData = { email, username, name }
		const user = await this.userRepository.create(newUser)

		return this.sendAuthorizedMessage(user.id)
	}

	async loginWithPassword(getEmailPassDto: GetEmailPassDto): Promise<Tokens> {
		const { email, password } = getEmailPassDto
		const user = await this.userRepository.findById(email)

		if (_.isNil(user?.password)) {
			throw new NotAcceptableException()
		}

		if (!user || !(await argon2.verifyPassword(user.password, password))) {
			throw new WrongEmailPass()
		}

		return this.sendAuthorizedMessage(user.id)
	}

	async loginWithCode(getEmailCodeDto: GetEmailCodeDto): Promise<Tokens> {
		const user = await this.userRepository.findByEmail(getEmailCodeDto.email)
		if (!user) {
			throw new UserNotFound()
		}

		if (!this.checkVerificationCode(getEmailCodeDto)) {
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

	private async checkVerificationCode({ email, code }: EmailVerification) {
		const emailVerificationCode = await this.redisService.getVerificationCode(email)
		return emailVerificationCode === code
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
