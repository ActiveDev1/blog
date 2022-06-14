import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common'
import {
	ApiBody,
	ApiCreatedResponse,
	ApiHeader,
	ApiNoContentResponse,
	ApiNotAcceptableResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiTags,
	ApiUnauthorizedResponse,
	ApiUnprocessableEntityResponse
} from '@nestjs/swagger'
import { User } from '@prisma/client'
import { GetUser } from '../../shared/decorators/get-user.decorator'
import { AuthGuard } from '../../shared/guards/auth.guard'
import { AuthService } from './auth.service'
import { GetEmailCodeDto } from './dtos/get-email-code.dto'
import { GetEmailPassDto } from './dtos/get-email-pass.dto'
import { GetEmailVerificationDto } from './dtos/get-email-verification.dto'
import { GetEmailDto } from './dtos/get-email.dto'
import { GetUsernameDto } from './dtos/get-username.dto'
import { Tokens } from './dtos/tokens.dto'

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
	async sendVerificationCode(@Body() body: GetEmailDto): Promise<void> {
		await this.authService.sendVerificationCode(body)
	}

	@Post('signup')
	@ApiBody({ type: GetEmailVerificationDto })
	@ApiCreatedResponse({
		description: 'User created',
		type: Tokens
	})
	@ApiUnprocessableEntityResponse({
		description: 'Wrong code received'
	})
	async signup(@Body() body: GetEmailVerificationDto): Promise<Tokens> {
		return await this.authService.signup(body)
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
	async loginWithPassword(@Body() body: GetEmailPassDto): Promise<Tokens> {
		return await this.authService.loginWithPassword(body)
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
	async loginWithCode(@Body() body: GetEmailCodeDto): Promise<Tokens> {
		return await this.authService.loginWithCode(body)
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
