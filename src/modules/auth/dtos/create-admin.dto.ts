import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateAdminDto {
	@IsNotEmpty()
	@IsString()
	name: string

	@IsEmail()
	email: string

	@IsNotEmpty()
	@IsString()
	username: string

	@IsNotEmpty()
	@IsString()
	password: string
}
