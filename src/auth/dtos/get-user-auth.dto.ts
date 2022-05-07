import { IsNotEmpty, IsEmail } from 'class-validator'

export class GetUserAuthDto {
	@IsEmail()
	@IsNotEmpty()
	email: string

	@IsNotEmpty()
	password: string
}
