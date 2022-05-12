import { ForbiddenException, Injectable } from '@nestjs/common'
import { CreatePostDto } from './dto/create-post.dto'
import { PostRepository } from './post.repository'
import * as _ from 'lodash'
import { generateRandomString, slugify } from '../common/utils/helpers/functions'
import { Post, User } from '@prisma/client'
import { UpdatePostDto } from './dto/update-post.dto'
import { WherePostUpdate } from './interfaces/where-post-update.interface'

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

	async findAll(userId: string): Promise<Post[]> {
		return await this.postRepository.findAllByUserId(userId)
	}

	async findOne(id: string): Promise<Post> {
		return await this.postRepository.findById(id)
	}

	async update({ id, authorId }: WherePostUpdate, updatePostDto: UpdatePostDto) {
		const post = await this.postRepository.findById(id)
		if (post.authorId !== authorId) {
			throw new ForbiddenException()
		}

		if (!_.isNil(updatePostDto.slug)) {
			const randomString = generateRandomString()
			updatePostDto.slug = slugify(updatePostDto.slug) + `-${randomString}`
		}

		return await this.postRepository.updateOne(id, updatePostDto)
	}
}
