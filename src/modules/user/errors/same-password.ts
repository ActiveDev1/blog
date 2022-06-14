import { HttpException, HttpStatus } from '@nestjs/common'

export class SamePassword extends HttpException {
	constructor() {
		super('Passwords are like each other', HttpStatus.BAD_REQUEST)
	}
}
