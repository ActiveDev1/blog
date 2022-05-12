import { IsBoolean, IsString, IsOptional, IsNotEmpty } from 'class-validator'
import { Transform } from 'class-transformer'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreatePostDto {
	@IsString()
	@IsNotEmpty()
	@Transform((value) => value.value.trim())
	@ApiProperty()
	title: string

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	body: string

	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	description: string

	@IsString({ always: false })
	@IsOptional()
	@Transform((value) => value.value.trim())
	@ApiPropertyOptional()
	slug: string

	@IsBoolean()
	@IsOptional()
	@ApiPropertyOptional({ default: false })
	isPublished: boolean
}
