import { IsString, IsNotEmpty } from 'class-validator'

export class GetPostIdParam {
	@IsString()
	@IsNotEmpty()
	id: string
}
