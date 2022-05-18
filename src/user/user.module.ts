import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { UserRepository } from './users.repository'
import { AuthModule } from 'src/auth/auth.module'

@Module({
	imports: [AuthModule],
	controllers: [UserController],
	providers: [UserService, UserRepository]
})
export class UserModule {}
