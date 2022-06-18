import { Role, User } from '@prisma/client'
import fastify from 'fastify'

declare module 'fastify' {
	interface FastifyRequest {
		role: Role
		user: User
	}
}
