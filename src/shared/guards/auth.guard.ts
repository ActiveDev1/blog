import { CanActivate, ExecutionContext, Injectable, mixin, Type } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard as PassportAuthGaurd } from '@nestjs/passport'

type strategyType = 'jwt' | 'refresh'

export const AuthGuard = (type: strategyType = 'jwt'): Type<CanActivate> => {
	@Injectable()
	class AuthGuardMixin extends PassportAuthGaurd(type) {
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

	return mixin(AuthGuardMixin)
}
