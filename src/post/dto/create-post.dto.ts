import { IsBoolean, IsString, IsOptional, IsNotEmpty } from 'class-validator'
import { Transform } from 'class-transformer'

export class CreatePostDto {
	@IsString()
	@IsNotEmpty()
	@Transform((value) => value.value.trim())
	title: string

	@IsString()
	@IsNotEmpty()
	body: string

	@IsString()
	@IsOptional()
	description: string

	@IsString({ always: false })
	@IsOptional()
	@Transform((value) => value.value.trim())
	slug: string

	@IsBoolean()
	@IsOptional()
	isPublished: boolean
}
