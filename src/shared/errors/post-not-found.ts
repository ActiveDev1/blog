import { HttpException, HttpStatus } from '@nestjs/common'

export class PostNotFound extends HttpException {
	constructor() {
		super('Post not found', HttpStatus.NOT_FOUND)
	}
}
