import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { User } from '@prisma/client'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { jwtConfig } from '../../../shared/config'
import { UserRepository } from '../../user/users.repository'
import { JwtPayload } from '../interfaces/jwt-payload.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private userRepository: UserRepository) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: jwtConfig.secret
		})
	}

	async validate(payload: JwtPayload): Promise<User> {
		const user = await this.userRepository.findOne({ id: payload.id })
		if (!user) {
			throw new UnauthorizedException()
		}
		return user
	}
}
