import { Module } from '@nestjs/common'
import { PostService } from './post.service'
import { PostController } from './post.controller'
import { PostRepository } from './post.repository'
import { UserRepository } from 'src/user/users.repository'

@Module({
	controllers: [PostController],
	providers: [PostService, PostRepository, UserRepository]
})
export class PostModule {}
