import { IsNotEmpty, IsString } from 'class-validator'

export class GetUsernameDto {
	@IsNotEmpty()
	@IsString()
	username: string
}
