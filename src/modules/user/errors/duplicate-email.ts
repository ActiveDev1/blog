import { HttpException, HttpStatus } from '@nestjs/common'

export class DuplicateEmail extends HttpException {
	constructor() {
		super('Duplicate email', HttpStatus.UNPROCESSABLE_ENTITY)
	}
}
