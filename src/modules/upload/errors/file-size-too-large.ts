import { HttpException, HttpStatus } from '@nestjs/common'

export class FileSizeTooLarge extends HttpException {
	constructor() {
		super('File size too large', HttpStatus.BAD_REQUEST)
	}
}
