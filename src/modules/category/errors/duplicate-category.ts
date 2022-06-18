import { HttpException, HttpStatus } from '@nestjs/common'

export class DuplicateCategory extends HttpException {
	constructor() {
		super('Duplicate category', HttpStatus.UNPROCESSABLE_ENTITY)
	}
}
