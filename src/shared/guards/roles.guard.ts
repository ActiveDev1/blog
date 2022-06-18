import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { FastifyRequest } from 'fastify'
import { ROLE_KEY } from '../decorators/roles.decorator'
import { Role } from '../enums/role.enum'

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRole = this.reflector.getAllAndOverride<Role>(ROLE_KEY, [
			context.getHandler(),
			context.getClass()
		])
		if (!requiredRole) {
			return true
		}
		const { user } = context.switchToHttp().getRequest<FastifyRequest>()
		return user.role === requiredRole
	}
}
