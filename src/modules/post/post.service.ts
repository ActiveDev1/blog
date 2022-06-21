import { ForbiddenException, Injectable } from '@nestjs/common'
import { Post, User } from '@prisma/client'
import * as _ from 'lodash'
import { PostNotFound } from '../../shared/errors/post-not-found'
import { UserNotFound } from '../../shared/errors/user-not-found'
import { generateRandomString, slugify } from '../../shared/utils/helpers/functions'
import { CategoryRepository } from '../category/category.repository'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { InvalidCategory } from './errors/invalid-category'
import { WherePostLike } from './interfaces/where-post-like.interface'
import { WherePost } from './interfaces/where-post.interface'
import { ConnectionArgs } from './page/connection-args.dto'
import { PostLikeRepository } from './repositories/post-like.repository'
import { PostRepository } from './repositories/post.repository'

@Injectable()
export class PostService {
	constructor(
		private readonly postRepository: PostRepository,
		private readonly postLikeRepository: PostLikeRepository,
		private readonly categoryRepository: CategoryRepository
	) {}

	async create(createPostDto: CreatePostDto, user: User): Promise<Post> {
		const { slug, title } = createPostDto

		const validCategories = await this.categoryRepository.hasExistsWithIds(createPostDto.categories)
		if (!validCategories) {
			throw new InvalidCategory()
		}

		const randomString = generateRandomString()
		createPostDto.slug = _.isNil(slug) || _.isEmpty(slug) ? slugify(title) : slugify(slug)
		createPostDto.slug += `-${randomString}`

		const categories = createPostDto.categories.map((categoryId) => ({ categoryId }))
		return await this.postRepository.create({ ...createPostDto, categories }, user.id)
	}

	async findPage(connectionArgs: ConnectionArgs) {
		return await this.postRepository.findPage(connectionArgs)
	}

	async findAll(userId: string) {
		const user = await this.postRepository.findAllByUserId(userId)
		if (!user) {
			throw new UserNotFound()
		}
		return user
	}

	async findOne(id: string): Promise<Post> {
		const post = await this.postRepository.findById(id)
		if (!post) {
			throw new PostNotFound()
		}
		return post
	}

	async update({ id, authorId }: WherePost, updatePostDto: UpdatePostDto) {
		const post = await this.postRepository.findById(id)

		if (!post) {
			throw new PostNotFound()
		}

		if (post.authorId !== authorId) {
			throw new ForbiddenException()
		}

		if (!_.isNil(updatePostDto.slug)) {
			const randomString = generateRandomString()
			updatePostDto.slug = slugify(updatePostDto.slug) + `-${randomString}`
		}

		if (!_.isEmpty(updatePostDto.categories)) {
			const validCategories = await this.categoryRepository.hasExistsWithIds(
				updatePostDto.categories
			)

			if (!validCategories) {
				throw new InvalidCategory()
			}
		}

		const categories = updatePostDto.categories.map((categoryId) => ({ categoryId }))

		return await this.postRepository.updateOne(id, { ...updatePostDto, categories })
	}

	async delete({ id, authorId }: WherePost) {
		const post = await this.postRepository.findById(id)

		if (!post) {
			throw new PostNotFound()
		}

		if (post.authorId !== authorId) {
			throw new ForbiddenException()
		}

		return await this.postRepository.deleteOne(id)
	}

	async like({ postId, userId }: WherePostLike) {
		const [post, postLike] = await Promise.all([
			this.postRepository.findById(postId),
			this.postLikeRepository.findOne({ postId, userId })
		])

		if (!post) {
			throw new PostNotFound()
		}

		if (!postLike) {
			await this.postLikeRepository.create({ postId, userId })
		} else {
			await this.postLikeRepository.deleteOne({ postId, userId })
		}

		return { liked: postLike ? false : true }
	}

	async getUserLikes(id: string) {
		const likes = await this.postLikeRepository.findAllByPostId(id)
		const users = likes.map((like) => like.user)
		return users
	}

	async getLikesCount(id: string) {
		const count = await this.postLikeRepository.count(id)
		return { likes: count }
	}
}
