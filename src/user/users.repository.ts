import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUser } from './interfaces/create-user.interface'

@Injectable()
export class UserRepository {
	findByIdWithPosts(userId: string) {
		throw new Error('Method not implemented.')
	}
	constructor(private readonly prisma: PrismaService) {}

	async create({ email, name, username }: CreateUser): Promise<User> {
		return await this.prisma.user.create({
			data: { email, name, username, profile: { create: {} } }
		})
	}

	async findById(id: string): Promise<User> {
		return await this.prisma.user.findUnique({
			where: { id }
		})
	}

	async findByEmail(email: string): Promise<User> {
		return await this.prisma.user.findUnique({
			where: { email }
		})
	}

	async findOneWithProfileAndPosts(id: string) {
		const profileFind: Prisma.ProfileArgs = {
			select: { id: true, bio: true, avatar: true, cover: true }
		}
		const postFindMany: Prisma.PostFindManyArgs = {
			select: {
				id: true,
				title: true,
				description: true,
				slug: true,
				cover: true,
				createdAt: true
			},
			where: { isPublished: true, deletedAt: null }
		}
		const select: Prisma.UserSelect = {
			id: true,
			name: true,
			username: true,
			profile: profileFind,
			posts: postFindMany
		}
		return await this.prisma.user.findUnique({ where: { id }, select })
	}
}
