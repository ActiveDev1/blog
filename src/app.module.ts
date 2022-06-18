import { Module } from '@nestjs/common'
import { AuthModule } from './modules/auth/auth.module'
import { CategoryModule } from './modules/category/category.module'
import { PostModule } from './modules/post/post.module'
import { MailModule } from './modules/services/mail/mail.module'
import { MinioModule } from './modules/services/minio/minio.module'
import { PrismaModule } from './modules/services/prisma/prisma.module'
import { RedisModule } from './modules/services/redis/redis.module'
import { UploadModule } from './modules/upload/upload.module'
import { UserModule } from './modules/user/user.module'

@Module({
	imports: [
		AuthModule,
		PrismaModule,
		RedisModule,
		MailModule,
		UserModule,
		PostModule,
		MinioModule,
		UploadModule,
		CategoryModule
	]
})
export class AppModule {}
