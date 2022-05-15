import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '../shared/guards/auth.guard'
import { User } from '@prisma/client'
import { AuthService } from './auth.service'
import { GetUser } from '../shared/decorators/get-user.decorator'
import { GetEmailDto } from './dtos/get-email.dto'
import { GetSignupVerificationDto } from './dtos/get-signup-verification.dto'
import {
	ApiCreatedResponse,
	ApiUnprocessableEntityResponse,
	ApiBody,
	ApiHeader,
	ApiTags,
	ApiOkResponse,
	ApiUnauthorizedResponse,
	ApiNotAcceptableResponse,
	ApiNotFoundResponse,
	ApiNoContentResponse
} from '@nestjs/swagger'
import { Tokens } from './dtos/tokens.dto'
import { GetEmailPassDto } from './dtos/get-email-pass.dto'
import { GetEmailCodeDto } from './dtos/get-email-code.dto'
import { GetUsernameDto } from './dtos/get-username.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('code')
	@ApiBody({ type: GetEmailDto })
	@ApiNoContentResponse({
		description: 'A verification code sent to target email'
	})
	@HttpCode(HttpStatus.NO_CONTENT)
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
	async signup(@Body() getSignupVerificationDto: GetSignupVerificationDto): Promise<Tokens> {
		return await this.authService.signup(getSignupVerificationDto)
	}

	@Post('login/password')
	@ApiBody({ type: GetEmailPassDto })
	@ApiOkResponse({
		description: 'Successful login',
		type: Tokens
	})
	@ApiNotAcceptableResponse({
		description: 'The user has not yet registered the password'
	})
	@ApiUnauthorizedResponse({
		description: 'Email and or password is incorrect'
	})
	@HttpCode(200)
	async loginWithPassword(@Body() getEmailPassDto: GetEmailPassDto): Promise<Tokens> {
		return await this.authService.loginWithPassword(getEmailPassDto)
	}

	@Post('login/code')
	@ApiBody({ type: GetEmailCodeDto })
	@ApiOkResponse({
		description: 'Successful login',
		type: Tokens
	})
	@ApiNotFoundResponse({
		description: 'User not found'
	})
	@ApiUnprocessableEntityResponse({
		description: 'Wrong code received'
	})
	@HttpCode(200)
	async loginWithCode(@Body() getEmailCodeDto: GetEmailCodeDto): Promise<Tokens> {
		return await this.authService.loginWithCode(getEmailCodeDto)
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

	@Post('user-existence')
	@ApiBody({ type: GetEmailCodeDto })
	async userExistence(@Body() body: GetUsernameDto) {
		return await this.authService.checkUserExistence(body)
	}
}
