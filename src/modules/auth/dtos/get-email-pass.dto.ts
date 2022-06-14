import { IsNotEmpty, IsEmail } from 'class-validator'

export class GetEmailPassDto {
	@IsEmail()
	@IsNotEmpty()
	email: string

	@IsNotEmpty()
	password: string
}
