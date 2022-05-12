import { IsString, IsNotEmpty } from 'class-validator'

export class GetUserIdParam {
	@IsNotEmpty()
	@IsString()
	authorId: string
}
