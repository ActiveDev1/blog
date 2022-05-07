import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common'
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
	ApiTags,
	ApiOkResponse,
	ApiUnauthorizedResponse
} from '@nestjs/swagger'
import { Tokens } from './dtos/tokens.dto'
import { GetUserAuthDto } from './dtos/get-user-auth.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('code')
	@ApiBody({ type: GetEmailDto })
	@ApiOkResponse({
		description: 'A verification code sent to target email'
	})
	@HttpCode(200)
	async sendVerificationCode(@Body() getEmailDto: GetEmailDto): Promise<void> {
		await this.authService.sendVerificationCode(getEmailDto)
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

	@Post('login')
	@ApiBody({ type: GetUserAuthDto })
	@ApiOkResponse({
		description: 'Successful login',
		type: Tokens
	})
	@HttpCode(200)
	@ApiUnauthorizedResponse({
		description: 'Email and or password is incorrect'
	})
	async login(@Body() getUserAuthDto: GetUserAuthDto): Promise<Tokens> {
		return await this.authService.login(getUserAuthDto)
	}

	@Post('refresh')
	@UseGuards(AuthGuard('refresh'))
	@ApiHeader({
		name: 'Authorization',
		description: 'Must be refresh token',
		required: true
	})
	@ApiCreatedResponse({
		description: 'Access & Refresh tokens',
		type: Tokens
	})
	async refreshToken(@GetUser() user: User): Promise<Tokens> {
		return await this.authService.verifyRefreshToken(user.id)
	}
}
