import { Module } from '@nestjs/common'
import { PostCommentController } from './post-comment.controller'
import { PostCommentService } from './post-comment.service'
import { PostController } from './post.controller'
import { PostService } from './post.service'
import { PostCommentRepository } from './repositories/post-comment.repository'
import { PostLikeRepository } from './repositories/post-like.repository'
import { PostRepository } from './repositories/post.repository'

@Module({
	controllers: [PostController, PostCommentController],
	providers: [
		PostService,
		PostCommentService,
		PostRepository,
		PostCommentRepository,
		PostLikeRepository
	]
})
export class PostModule {}
