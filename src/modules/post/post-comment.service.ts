import { ForbiddenException, Injectable } from '@nestjs/common'
import { Post_Comment } from '@prisma/client'
import { getMentionedUsernames, truncateString } from '../../shared/utils/helpers/functions'
import { PostNotFound } from '../../shared/errors/post-not-found'
import { MailService } from '../services/mail/mail.service'
import { UserRepository } from '../user/users.repository'
import { CommentNotFound } from './errors/comment-not-found'
import { LevelThreeComment } from './errors/level-three-comment'
import { CreateComment } from './interfaces/create-comment.interface'
import { WhereComment } from './interfaces/where-comment.interface'
import { PostCommentRepository } from './repositories/post-comment.repository'
import { PostRepository } from './repositories/post.repository'

@Injectable()
export class PostCommentService {
	constructor(
		private readonly postCommentRepository: PostCommentRepository,
		private readonly postRepository: PostRepository,
		private readonly userRepository: UserRepository,
		private readonly mailService: MailService
	) {}

	async create(createComment: CreateComment): Promise<Post_Comment> {
		const { postId, parentId, content, user } = createComment

		const post = await this.postRepository.findById(postId)
		if (!post) {
			throw new PostNotFound()
		}

		if (parentId) {
			const parentComment = await this.postCommentRepository.findById(parentId)
			if (!parentComment) {
				throw new CommentNotFound()
			}

			if (parentComment.parentId) {
				throw new LevelThreeComment()
			}
		}

		const mentionedUsernames = getMentionedUsernames(content),
			truncatedComment = truncateString(content)

		const mentionedUsers = await this.userRepository.findAllByUsernames(mentionedUsernames)

		await Promise.allSettled(
			mentionedUsers.map(({ email, name }) =>
				this.mailService.sendMentionedOnComment({
					ownerName: user.name,
					receiver: { email, name },
					truncatedComment
				})
			)
		)

		return await this.postCommentRepository.create(createComment)
	}

	async getAll(postId: string) {
		const post = await this.postRepository.findById(postId)

		if (!post) {
			throw new PostNotFound()
		}

		return await this.postCommentRepository.findAllByPostId(postId)
	}

	async update({ id, userId }: WhereComment, content: string) {
		const comment = await this.postCommentRepository.findById(id)

		if (!comment) {
			throw new CommentNotFound()
		}

		if (comment.userId !== userId) {
			throw new ForbiddenException()
		}

		return await this.postCommentRepository.updateOne(id, content)
	}

	async delete(id: string, userId: string) {
		const comment = await this.postCommentRepository.findById(id)

		if (!comment) {
			throw new CommentNotFound()
		}

		if (comment.userId !== userId) {
			throw new ForbiddenException()
		}

		await this.postCommentRepository.deleteOne(id)
	}
}
