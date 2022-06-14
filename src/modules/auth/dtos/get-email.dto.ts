import { IsNotEmpty, IsEmail } from 'class-validator'

export class GetEmailDto {
	@IsEmail()
	@IsNotEmpty()
	email: string
}
