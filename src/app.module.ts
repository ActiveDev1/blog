import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { PostModule } from './post/post.module'
import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [UserModule, PostModule, PrismaModule, AuthModule]
})
export class AppModule {}
