import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { UpdateUserDto } from './dtos/update-user.dto'
import { UserPersonalData } from './interfaces/create-user.interface'

@Injectable()
export class UserRepository {
	defaultOptions: Prisma.UserArgs = {
		select: { id: true, name: true, username: true }
	}

	constructor(private readonly prisma: PrismaService) {}

	async create({ email, name, username }: UserPersonalData) {
		return await this.prisma.user.create({
			data: { email, name, username, profile: { create: {} } }
		})
	}

	async findOne(id: string) {
		return await this.prisma.user.findUnique({ where: { id } })
	}

	async findById(id: string, options?: Prisma.UserArgs) {
		return await this.prisma.user.findFirst({
			where: { id, deletedAt: null },
			...(options || this.defaultOptions)
		})
	}

	async findByEmail(email: string) {
		return await this.prisma.user.findUnique({
			where: { email }
		})
	}

	async findOneWithProfileAndPosts(id: string) {
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
			profile: true,
			posts: postFindMany
		}
		return await this.findById(id, { select })
	}

	async findOneWithProfile(id: string) {
		return await this.findById(id, { select: { ...this.defaultOptions.select, profile: true } })
	}

	async updateOne(id: string, data: UpdateUserDto) {
		return await this.prisma.user.update({
			where: { id },
			data: { ...data, profile: { update: { ...data.profile } } },
			select: { ...this.defaultOptions.select, profile: true }
		})
	}

	async updateOnePassword(id: string, password: string) {
		return await this.prisma.user.update({
			where: { id },
			data: { password },
			select: null
		})
	}
}
