import { Type } from 'class-transformer'
import { IsOptional, IsPositive } from 'class-validator'
import defaultValueDecorator from '../../../shared/decorators/default-value.decorator'

export class PaginationDto {
	@IsOptional()
	@Type(() => Number)
	@defaultValueDecorator<number>(1)
	@IsPositive()
	page?: number

	@IsOptional()
	@Type(() => Number)
	@defaultValueDecorator<number>(6)
	@IsPositive()
	limit?: number
}
