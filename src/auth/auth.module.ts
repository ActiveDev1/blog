import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { jwtConfig } from '../config'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'
import { RedisModule } from '../redis/redis.module'
import { MailModule } from 'src/mail/mail.module'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register(jwtConfig),
		PrismaModule,
		RedisModule,
		MailModule
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
	exports: [PassportModule, JwtStrategy]
})
export class AuthModule {}
