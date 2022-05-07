import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { User } from '@prisma/client'
import { AuthService } from './auth.service'
import { GetUser } from './decorators/get-user.decorator'
import { GetEmailDto } from './dtos/get-email.dto'
import { GetSignupVerificationDto } from './dtos/get-signup-verification.dto'
import {
	ApiCreatedResponse,
	ApiUnprocessableEntityResponse,
	ApiBody,
	ApiHeader,
	ApiTags
} from '@nestjs/swagger'
import { Tokens } from './dtos/tokens.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('code')
	@ApiBody({ type: GetEmailDto })
	@ApiCreatedResponse({
		description: 'A verification code sent to target email'
	})
	async sendVerificationCode(@Body() getEmailDto: GetEmailDto): Promise<void> {
		return await this.authService.sendVerificationCode(getEmailDto)
	}

	@Post('signup')
	@ApiBody({ type: GetSignupVerificationDto })
	@ApiCreatedResponse({
		description: 'User created',
		type: Tokens
	})
	@ApiUnprocessableEntityResponse({
		description: 'Wrong code received'
	})
	async signup(
		@Body() getSignupVerificationDto: GetSignupVerificationDto
	): Promise<Tokens> {
		return await this.authService.signup(getSignupVerificationDto)
	}

	@Post('refresh')
	@UseGuards(AuthGuard('refresh'))
	@ApiHeader({
		name: 'Authorization',
		allowEmptyValue: false,
		description: 'Must be refresh token',
		example: 'Bearer JWT-TOKEN'
	})
	@ApiCreatedResponse({
		description: 'Access & Refresh tokens',
		type: Tokens
	})
	async refreshToken(@GetUser() user: User): Promise<Tokens> {
		return await this.authService.verifyRefreshToken(user.id)
	}
}
