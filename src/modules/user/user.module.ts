import { Module } from '@nestjs/common'
import { AuthModule } from '../../modules/auth/auth.module'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { UserRepository } from './users.repository'

@Module({
	imports: [AuthModule],
	controllers: [UserController],
	providers: [UserService, UserRepository]
})
export class UserModule {}
