import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { User } from '@prisma/client'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { refreshTokenConfig } from '../../../shared/config'
import { UserRepository } from '../../user/users.repository'
import { JwtPayload } from '../interfaces/jwt-payload.interface'

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
	constructor(private userRepository: UserRepository) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: refreshTokenConfig.secret
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
