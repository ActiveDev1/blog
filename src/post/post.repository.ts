import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'

@Injectable()
export class PostRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(createPostDto: CreatePostDto, authorId: string) {
		return await this.prisma.post.create({
			data: { ...createPostDto, cover: '', authorId }
		})
	}

	async findById(id: string) {
		return await this.prisma.post.findFirst({
			where: { id, isPublished: true, deletedAt: null }
		})
	}

	async findAllByUserId(userId: string) {
		return await this.prisma.post.findMany({
			where: { authorId: userId, isPublished: true, deletedAt: null }
		})
	}

	async updateOne(id: string, updatePostDto: UpdatePostDto) {
		return await this.prisma.post.update({
			where: { id },
			data: { ...updatePostDto }
		})
	}
}
