import {
	ArgumentsHost,
	BadRequestException,
	Catch,
	ExceptionFilter
} from '@nestjs/common'
import { FastifyReply } from 'fastify'

export class ValidationException extends BadRequestException {
	constructor(public validationErrors: any) {
		super()
	}
}

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
	catch(exception: ValidationException, host: ArgumentsHost): any {
		const ctx = host.switchToHttp()
		const reply = ctx.getResponse<FastifyReply>()

		return reply.code(400).send({
			statusCode: 400,
			error: exception.validationErrors
		})
	}
}
