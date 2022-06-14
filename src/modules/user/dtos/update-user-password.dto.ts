import { IsString } from 'class-validator'
import { IsNullable } from '../../../shared/utils/helpers/decorators/nullable.decorator'

export class UpdateUserPasswordDto {
	@IsString()
	@IsNullable()
	oldPassword: string

	@IsString()
	newPassword: string
}
