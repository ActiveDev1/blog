import { Module } from '@nestjs/common'
import { PostController } from './post.controller'
import { PostService } from './post.service'
import { PostLikeRepository } from './repositories/post-like.repository'
import { PostRepository } from './repositories/post.repository'

@Module({
	controllers: [PostController],
	providers: [PostService, PostRepository, PostLikeRepository]
})
export class PostModule {}
