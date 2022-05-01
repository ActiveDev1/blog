import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { PostModule } from './post/post.module'
import { PrismaModule } from './prisma/prisma.module'

@Module({
	imports: [UserModule, PostModule, PrismaModule]
})
export class AppModule {}
