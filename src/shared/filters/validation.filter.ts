import {
	ArgumentsHost,
	BadRequestException,
	Catch,
	ExceptionFilter
} from '@nestjs/common'
import { FastifyReply } from 'fastify'

interface Response {
	statusCode: number
	error: any
}

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
		const response: Response = {
			statusCode: 400,
			error: exception.validationErrors
		}

		return reply.code(response.statusCode).send(response)
	}
}
