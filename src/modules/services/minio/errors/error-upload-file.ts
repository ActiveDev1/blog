import { HttpException, HttpStatus } from '@nestjs/common'

export class ErrorUploadFile extends HttpException {
	constructor() {
		super('Error uploading file', HttpStatus.INTERNAL_SERVER_ERROR)
	}
}
