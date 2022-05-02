import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserRepository } from 'src/user/users.repository'
import { GetEmailDto } from './dtos/get-email.dto'

@Injectable()
export class AuthService {
	constructor(
		private userRepository: UserRepository,
		private jwtService: JwtService
	) {}

	async sendSignupCode(getEmailDto: GetEmailDto): Promise<void> {
		// TODO: Generate a code
		// TODO: Save code in redis
		// TODO: Send code to gmail
	}
}
