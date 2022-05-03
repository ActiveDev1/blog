import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { User } from '@prisma/client'
import { AuthService } from './auth.service'
import { GetUser } from './decorators/get-user.decorator'
import { GetEmailDto } from './dtos/get-email.dto'
import { GetSignupVerificationDto } from './dtos/get-signup-verification-dto.dto'
import { ITokens } from './interfaces/tokens.interface'

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('signup/code')
	async sendSignupCode(@Body() getEmailDto: GetEmailDto): Promise<void> {
		return await this.authService.sendSignupCode(getEmailDto)
	}

	@Post('signup')
	async signup(
		@Body() getSignupVerificationDto: GetSignupVerificationDto
	): Promise<ITokens> {
		return await this.authService.signup(getSignupVerificationDto)
	}

	@Post('refresh')
	@UseGuards(AuthGuard('refresh'))
	async refreshToken(@GetUser() user: User): Promise<ITokens> {
		return await this.authService.verifyRefreshToken(user.id)
	}
}
