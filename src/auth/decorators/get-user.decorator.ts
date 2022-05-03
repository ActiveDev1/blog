import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from '@prisma/client'

export const GetUser = createParamDecorator(
	(data: never, ctx: ExecutionContext): User => {
		return ctx.switchToHttp().getRequest()['user']
	}
)
