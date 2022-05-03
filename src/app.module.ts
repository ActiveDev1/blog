import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { PostModule } from './post/post.module'
import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './auth/auth.module'
import { RedisModule } from './redis/redis.module'
import { MailModule } from './mail/mail.module'

@Module({
	imports: [
		AuthModule,
		PrismaModule,
		RedisModule,
		MailModule,
		UserModule,
		PostModule
	]
})
export class AppModule {}
