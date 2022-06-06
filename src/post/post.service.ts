import { ForbiddenException, Injectable } from '@nestjs/common'
import { CreatePostDto } from './dto/create-post.dto'
import { PostRepository } from './post.repository'
import { generateRandomString, slugify } from '../common/utils/helpers/functions'
import { Post, User } from '@prisma/client'
import { UpdatePostDto } from './dto/update-post.dto'
import { WherePost } from './interfaces/where-post.interface'
import { PostNotFound } from '../shared/errors/post-not-found'
import { UserNotFound } from '../shared/errors/user-not-found'
import * as _ from 'lodash'

@Injectable()
export class PostService {
	constructor(private postRepository: PostRepository) {}

	async create(createPostDto: CreatePostDto, user: User): Promise<Post> {
		const { slug, title } = createPostDto
		const randomString = generateRandomString()

		createPostDto.slug = _.isNil(slug) || _.isEmpty(slug) ? slugify(title) : slugify(slug)
		createPostDto.slug += `-${randomString}`

		return await this.postRepository.create(createPostDto, user.id)
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

		return await this.postRepository.updateOne(id, updatePostDto)
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
}
