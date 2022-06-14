import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from '@prisma/client'

/**
 * Decorator that get user data from req.user.
 */
export const GetUser = createParamDecorator((_data: never, ctx: ExecutionContext): User => {
	return ctx.switchToHttp().getRequest()['user']
})
