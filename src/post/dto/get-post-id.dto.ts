import { IsString, IsNotEmpty } from 'class-validator'

export class GetPostIdDto {
	@IsString()
	@IsNotEmpty()
	id: string
}
