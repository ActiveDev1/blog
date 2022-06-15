import { IsNotEmpty, IsString } from 'class-validator'
import { IsNullable } from '../../../shared/utils/helpers/decorators/nullable.decorator'

export class CreateCommentDto {
	@IsString()
	@IsNullable()
	parentId: string

	@IsString()
	@IsNotEmpty()
	content: string
}
