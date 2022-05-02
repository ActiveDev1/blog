import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { GetEmailDto } from './dtos/get-email.dto'

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('signup/code')
	async sendSignupCode(@Body() getEmailDto: GetEmailDto): Promise<void> {
		return await this.authService.sendSignupCode(getEmailDto)
	}
}
