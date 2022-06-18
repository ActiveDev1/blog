import { HttpException, HttpStatus } from '@nestjs/common'

export class DuplicateUser extends HttpException {
	constructor() {
		super('User exists', HttpStatus.NOT_ACCEPTABLE)
	}
}
