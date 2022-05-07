import { HttpException, HttpStatus } from '@nestjs/common'

export class WrongEmailPass extends HttpException {
	constructor() {
		super('Email and or password is incorrect', HttpStatus.FORBIDDEN)
	}
}
