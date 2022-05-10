import { Injectable, UseGuards } from '@nestjs/common'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { PostRepository } from './post.repository'
import * as _ from 'lodash'
import {
	generateRandomString,
	slugify
} from 'src/common/utils/helpers/functions'
import { Post, User } from '@prisma/client'

@Injectable()
export class PostService {
	constructor(private postRepository: PostRepository) {}

	async create(createPostDto: CreatePostDto, user: User): Promise<Post> {
		const { slug, title } = createPostDto
		const randomString = generateRandomString()

		createPostDto.slug =
			_.isNil(slug) || _.isEmpty(slug) ? slugify(title) : slugify(slug)

		createPostDto.slug += `-${randomString}`
		return await this.postRepository.create(createPostDto, user.id)
	}

	findAll() {
		return `This action returns all post`
	}

	async findOne(id: string): Promise<Post> {
		return await this.postRepository.findById(id)
	}

	update(id: number, updatePostDto: UpdatePostDto) {
		return `This action updates a #${id} post`
	}

	remove(id: number) {
		return `This action removes a #${id} post`
	}
}
