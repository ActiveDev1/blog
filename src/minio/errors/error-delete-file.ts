import { HttpException, HttpStatus } from '@nestjs/common'

export class ErrorDeleteFile extends HttpException {
	constructor() {
		super('Error deleting file', HttpStatus.INTERNAL_SERVER_ERROR)
	}
}
