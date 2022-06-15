import { ForbiddenException, Injectable } from '@nestjs/common'
import { Post_Comment } from '@prisma/client'
import { PostNotFound } from '../../shared/errors/post-not-found'
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
		private readonly postRepository: PostRepository
	) {}

	async create(createComment: CreateComment): Promise<Post_Comment> {
		const { postId, parentId } = createComment

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
