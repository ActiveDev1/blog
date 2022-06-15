import { HttpException, HttpStatus } from '@nestjs/common'

export class LevelThreeComment extends HttpException {
	constructor() {
		super('Can not create comment on subcomment', HttpStatus.NOT_ACCEPTABLE)
	}
}
