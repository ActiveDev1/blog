import { IsEmail, IsNotEmpty, IsNumberString, Length } from 'class-validator'
import { EmailVerification } from '../interfaces/email-verification.interface'

export class GetSignupVerificationDto implements EmailVerification {
	@IsEmail()
	@IsNotEmpty()
	email: string

	@IsNumberString()
	@Length(6, 6)
	code: string
}
