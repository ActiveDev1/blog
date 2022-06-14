import { Module } from '@nestjs/common'
import { UserModule } from './modules/user/user.module'
import { PostModule } from './modules/post/post.module'
import { PrismaModule } from './modules/services/prisma/prisma.module'
import { AuthModule } from './modules/auth/auth.module'
import { RedisModule } from './modules/services/redis/redis.module'
import { MailModule } from './modules/services/mail/mail.module'
import { MinioModule } from './modules/services/minio/minio.module'
import { UploadModule } from './modules/upload/upload.module'

@Module({
	imports: [
		AuthModule,
		PrismaModule,
		RedisModule,
		MailModule,
		UserModule,
		PostModule,
		MinioModule,
		UploadModule
	]
})
export class AppModule {}
