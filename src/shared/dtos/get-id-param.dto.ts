import { IsString, IsNotEmpty } from 'class-validator'

export class GetIdParam {
	@IsNotEmpty()
	@IsString()
	id: string
}
