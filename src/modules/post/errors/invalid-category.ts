import { HttpException, HttpStatus } from '@nestjs/common'

export class InvalidCategory extends HttpException {
	constructor() {
		super('One of categories not exists', HttpStatus.NOT_ACCEPTABLE)
	}
}
