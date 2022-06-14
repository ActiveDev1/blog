import { HttpException, HttpStatus } from '@nestjs/common'

export class UnsupportedFileType extends HttpException {
	constructor() {
		super('Unsupported file type', HttpStatus.BAD_REQUEST)
	}
}
