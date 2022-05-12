import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { jwtConfig } from '../config'
import { JwtStrategy } from './strategies/jwt.strategy'
import { RedisModule } from '../redis/redis.module'
import { MailModule } from '../mail/mail.module'
import { UserRepository } from '../user/users.repository'
import { RefreshStrategy } from './strategies/refresh.strategy'

@Module({
	imports: [JwtModule.register(jwtConfig), RedisModule, MailModule],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, RefreshStrategy, UserRepository]
})
export class AuthModule {}
