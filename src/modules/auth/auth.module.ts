import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { MailModule } from '../../modules/services/mail/mail.module'
import { RedisModule } from '../../modules/services/redis/redis.module'
import { jwtConfig } from '../../shared/config'
import { UserRepository } from '../user/users.repository'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { RefreshStrategy } from './strategies/refresh.strategy'

@Module({
	imports: [JwtModule.register(jwtConfig), RedisModule, MailModule],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, RefreshStrategy, UserRepository],
	exports: [AuthService]
})
export class AuthModule {}
