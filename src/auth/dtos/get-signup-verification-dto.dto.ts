import { IsEmail, IsNotEmpty, Length } from 'class-validator'

export class GetSignupVerificationDto {
	@IsEmail()
	@IsNotEmpty()
	email: string

	@IsNotEmpty()
	@Length(6, 6)
	code: string
}
