import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtPayload } from '../interfaces/jwt-payload.interface'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { jwtConfig } from '../../config'
import { User } from '@prisma/client'
import { UserRepository } from '../../user/users.repository'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private userRepository: UserRepository) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: jwtConfig.secret
		})
	}

	async validate(payload: JwtPayload): Promise<User> {
		const user = await this.userRepository.findById(payload.id)
		if (!user) {
			throw new UnauthorizedException()
		}
		return user
	}
}
