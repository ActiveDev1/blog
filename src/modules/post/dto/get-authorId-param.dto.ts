import { IsNotEmpty, IsString } from 'class-validator'

export class GetAuthorIdParam {
	@IsNotEmpty()
	@IsString()
	authorId: string
}
