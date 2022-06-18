import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from '@prisma/client'
import { FastifyRequest } from 'fastify'

/**
 * Decorator that get user data from req.user.
 */
export const GetUser = createParamDecorator((_data: never, ctx: ExecutionContext): User => {
	const { user } = ctx.switchToHttp().getRequest<FastifyRequest>()
	return user
})
