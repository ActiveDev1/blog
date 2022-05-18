import { Profile, User } from '@prisma/client'
import { IsEmail, IsOptional, IsString, ValidateNested } from 'class-validator'

class UpdateProfile implements Partial<Profile> {
	@IsString()
	@IsOptional()
	bio: string
}

export class UpdateUserDto implements Partial<User> {
	@IsString()
	@IsOptional()
	name: string

	@IsString()
	@IsOptional()
	username: string

	@ValidateNested()
	@IsOptional()
	profile: UpdateProfile
}
