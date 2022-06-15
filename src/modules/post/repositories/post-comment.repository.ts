import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../../services/prisma/prisma.service'
import { CreateComment } from '../interfaces/create-comment.interface'

@Injectable()
export class PostCommentRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(createComment: CreateComment) {
		return await this.prisma.post_Comment.create({
			data: { ...createComment }
		})
	}

	async findById(id: string) {
		return await this.prisma.post_Comment.findUnique({
			where: { id }
		})
	}

	async findAllByPostId(postId: string) {
		const userArgs: Prisma.UserArgs = {
			select: {
				id: true,
				name: true,
				profile: {
					select: { bio: true, avatar: true }
				}
			}
		}
		const commentSelect: Prisma.Post_CommentSelect = {
			id: true,
			content: true,
			createdAt: true,
			updatedAt: true,
			user: userArgs
		}
		return await this.prisma.post_Comment.findMany({
			where: { postId, parentId: null },
			select: {
				...commentSelect,
				subComments: { select: commentSelect }
			}
		})
	}
}
