import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../services/prisma/prisma.service'
import { CreatePost } from '../interfaces/create-post.interface'
import { UpdatePost } from '../interfaces/update-post.interface'

interface PostWhereOptions {
	isPublished?: boolean
}

@Injectable()
export class PostRepository {
	defaultWhereOption: PostWhereOptions = { isPublished: true }

	constructor(private readonly prisma: PrismaService) {}

	async create(createPost: CreatePost, authorId: string) {
		return await this.prisma.post.create({
			data: { ...createPost, authorId, categories: { create: createPost.categories } }
		})
	}

	async findById(id: string, options?: PostWhereOptions) {
		return await this.prisma.post.findFirst({
			where: { id, deletedAt: null, ...(options && this.defaultWhereOption) }
		})
	}

	async findAllByUserId(userId: string, options?: PostWhereOptions) {
		return await this.prisma.post.findMany({
			where: { authorId: userId, deletedAt: null, ...(options || this.defaultWhereOption) }
		})
	}

	async updateOne(id: string, updatePost: UpdatePost) {
		return await this.prisma.post.update({
			where: { id },
			data: { ...updatePost, categories: { create: updatePost.categories } }
		})
	}

	async updateCover(id: string, cover: string) {
		return await this.prisma.post.update({ where: { id }, data: { cover } })
	}

	async deleteOne(id: string) {
		return await this.updateOne(id, { deletedAt: new Date() } as UpdatePost)
	}
}
