import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtPayload } from './interfaces/jwt-payload.interface'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { jwtConfig } from '../config'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private prisma: PrismaService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: jwtConfig.secret
		})
	}

	async validate(payload: JwtPayload): Promise<User> {
		const user = await this.prisma.user.findFirst({
			where: { id: payload.id }
		})
		if (!user) {
			throw new UnauthorizedException()
		}
		return user
	}
}
