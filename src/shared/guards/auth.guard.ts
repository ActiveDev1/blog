import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard as PassportAuthGaurd } from '@nestjs/passport'

@Injectable()
export class AuthGuard extends PassportAuthGaurd(['jwt', 'refresh']) {
	constructor(private readonly reflector: Reflector) {
		super()
	}

	canActivate(context: ExecutionContext) {
		const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler())

		if (isPublic) {
			return true
		}

		return super.canActivate(context)
	}
}
