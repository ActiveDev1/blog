import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { UserPersonalData } from './interfaces/create-user.interface'

@Injectable()
export class UserRepository {
	defaultOptions: Prisma.UserArgs = {
		select: { id: true, name: true, username: true, password: false }
	}

	constructor(private readonly prisma: PrismaService) {}

	async create({ email, name, username }: UserPersonalData): Promise<User> {
		return await this.prisma.user.create({
			data: { email, name, username, profile: { create: {} } }
		})
	}

	async findById(id: string, options?: Prisma.UserArgs): Promise<User> {
		return await this.prisma.user.findFirst({
			where: { id, deletedAt: null },
			...(options || this.defaultOptions)
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
		return await this.findById(id, {
			select,
			include: { posts: postFindMany, profile: profileFind }
		})
	}

	async findOneWithProfile(id: string): Promise<User> {
		return await this.findById(id, { select: { ...this.defaultOptions.select, profile: true } })
	}
}
