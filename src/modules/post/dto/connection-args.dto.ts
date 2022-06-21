import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsOptional, IsPositive } from 'class-validator'

export class ConnectionArgsDto {
	@IsOptional()
	@Type(() => Number)
	@ApiProperty({ required: false })
	@IsPositive()
	first?: number

	@IsOptional()
	@Type(() => Number)
	@ApiProperty({ required: false })
	@IsPositive()
	last?: number

	@ApiProperty({ required: false })
	after?: string

	@ApiProperty({ required: false })
	before?: string
}
