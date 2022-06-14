import { IsEnum, IsString } from 'class-validator'
import { UserDataTypes } from '../constant/user-data-type.enum'

export class GetUserInfoDto {
	@IsString()
	@IsEnum(UserDataTypes)
	type: string

	@IsString()
	value: string
}
