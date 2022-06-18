import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import {
	ArrayMaxSize,
	ArrayMinSize,
	IsArray,
	IsBoolean,
	IsNotEmpty,
	IsOptional,
	IsString
} from 'class-validator'

export class CreatePostDto {
	@IsString()
	@IsNotEmpty()
	@Transform(({ value }) => value?.trim())
	@ApiProperty()
	title: string

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	body: string

	@IsString()
	@IsOptional()
	@ApiPropertyOptional()
	description: string | null

	@IsString({ always: false })
	@IsOptional()
	@Transform(({ value }) => value?.trim())
	@ApiPropertyOptional()
	slug: string

	@ArrayMinSize(1)
	@ArrayMaxSize(3)
	@IsArray()
	categories: string[]

	@IsBoolean()
	@IsOptional()
	@ApiPropertyOptional({ default: false })
	isPublished: boolean
}
