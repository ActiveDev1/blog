import { InjectQueue } from '@nestjs/bull'
import { ForbiddenException, Injectable } from '@nestjs/common'
import { Queue } from 'bull'
import * as _ from 'lodash'
import { PostNotFound } from '../../shared/errors/post-not-found'
import { Job } from '../../shared/interfaces/job.interface'
import { getMentionedUsernames, truncateString } from '../../shared/utils/helpers/functions'
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
		@InjectQueue('mailer') private mailQueue: Queue
	) {}

	async create(createComment: CreateComment) {
		let { postId, parentId, content, user } = createComment
		let jobs: Job[] = []

		const post = await this.postRepository.findOneWithAuthor(postId)
		if (!post) {
			throw new PostNotFound()
		}

		content = content.replaceAll(new RegExp(`@${post.author.username}`, 'ig'), '').trim()

		const mentionedUsernames = _.uniq(getMentionedUsernames(content)),
			truncatedComment = truncateString(content)

		if (parentId) {
			const parentComment = await this.postCommentRepository.findById(parentId)

			if (!parentComment) {
				throw new CommentNotFound()
			}

			if (parentComment.parentId) {
				throw new LevelThreeComment()
			}

			jobs.push({
				name: 'reply-comment',
				data: {
					ownerName: user.name,
					receiver: parentComment.user,
					truncatedComment,
					postTitle: post.title
				}
			})
		}

		const mentionedUsers = !_.isEmpty(mentionedUsernames)
			? await this.userRepository.findAllByUsernames(mentionedUsernames)
			: []

		mentionedUsers.forEach(({ email, name }) => {
			jobs.push({
				name: 'mention-on-comment',
				data: {
					ownerName: user.name,
					receiver: { email, name },
					truncatedComment,
					postTitle: post.title
				}
			})
		})

		if (post.author.id !== user.id) {
			jobs.push({
				name: 'comment-on-post',
				data: {
					ownerName: user.name,
					receiver: { email: post.author.email, name: post.author.name },
					truncatedComment,
					postTitle: post.title
				}
			})
		}

		await this.mailQueue.addBulk(jobs)

		return await this.postCommentRepository.create({ content, parentId, postId, user })
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
