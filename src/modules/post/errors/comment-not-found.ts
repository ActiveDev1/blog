import { HttpException, HttpStatus } from '@nestjs/common'

export class CommentNotFound extends HttpException {
	constructor() {
		super('Comment not found', HttpStatus.NOT_FOUND)
	}
}
