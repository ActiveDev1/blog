import { Module } from '@nestjs/common'
import { CategoryRepository } from '../category/category.repository'
import { MailModule } from '../services/mail/mail.module'
import { UserRepository } from '../user/users.repository'
import { PostCommentController } from './post-comment.controller'
import { PostCommentService } from './post-comment.service'
import { PostController } from './post.controller'
import { PostService } from './post.service'
import { PostCommentRepository } from './repositories/post-comment.repository'
import { PostLikeRepository } from './repositories/post-like.repository'
import { PostRepository } from './repositories/post.repository'

@Module({
	imports: [MailModule],
	controllers: [PostController, PostCommentController],
	providers: [
		PostService,
		PostCommentService,
		PostRepository,
		PostCommentRepository,
		PostLikeRepository,
		UserRepository,
		CategoryRepository
	]
})
export class PostModule {}
