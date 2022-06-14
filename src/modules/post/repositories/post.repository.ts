import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../services/prisma/prisma.service'
import { CreatePostDto } from '../dto/create-post.dto'
import { UpdatePostDto } from '../dto/update-post.dto'

interface PostWhereOptions {
	isPublished?: boolean
}

@Injectable()
export class PostRepository {
	defaultWhereOption: PostWhereOptions = { isPublished: true }

	constructor(private readonly prisma: PrismaService) {}

	async create(createPostDto: CreatePostDto, authorId: string) {
		return await this.prisma.post.create({
			data: { ...createPostDto, cover: '', authorId }
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

	async updateOne(id: string, updatePostDto: UpdatePostDto) {
		return await this.prisma.post.update({
			where: { id },
			data: { ...updatePostDto }
		})
	}

	async updateCover(id: string, cover: string) {
		return await this.prisma.post.update({ where: { id }, data: { cover } })
	}

	async deleteOne(id: string) {
		return await this.updateOne(id, { deletedAt: new Date() } as UpdatePostDto)
	}
}
