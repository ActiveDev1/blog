import { HttpException, HttpStatus } from '@nestjs/common'

export class WrongVerificationCode extends HttpException {
	constructor() {
		super('Wrong verification code', HttpStatus.UNPROCESSABLE_ENTITY)
	}
}
