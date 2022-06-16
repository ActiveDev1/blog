import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../services/prisma/prisma.service'
import { WherePostLike } from '../interfaces/where-post-like.interface'

@Injectable()
export class PostLikeRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(where: WherePostLike) {
		return await this.prisma.post_Like.create({
			data: { ...where }
		})
	}

	async findOne(where: WherePostLike) {
		return await this.prisma.post_Like.findUnique({
			where: { userId_postId: where }
		})
	}

	async findAllByPostId(postId: string) {
		return await this.prisma.post_Like.findMany({
			where: { postId },
			select: {
				user: {
					select: {
						id: true,
						name: true,
						profile: {
							select: { bio: true, avatar: true }
						}
					}
				}
			}
		})
	}

	async count(postId: string) {
		return await this.prisma.post_Like.count({
			where: { postId }
		})
	}

	async deleteOne(where: WherePostLike) {
		return await this.prisma.post_Like.delete({
			where: { userId_postId: where }
		})
	}
}
