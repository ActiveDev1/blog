import { IsString, IsNotEmpty } from 'class-validator'

export class GetAuthorIdParam {
	@IsNotEmpty()
	@IsString()
	authorId: string
}
