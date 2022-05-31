import { Injectable } from '@nestjs/common'
import { Prisma, Profile, User } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { UpdateUserDto } from './dtos/update-user.dto'
import { UserPersonalData } from './interfaces/create-user.interface'
import { config } from '../config'
import * as _ from 'lodash'

interface UserWithProfile extends User {
	profile: Profile
}

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

	private async updateById(id: string, data: Prisma.UserUpdateInput, options?: Prisma.UserArgs) {
		return await this.prisma.user.update({ where: { id }, data, ...options })
	}

	async findOne(where: Prisma.UserWhereUniqueInput) {
		return await this.prisma.user.findUnique({ where })
	}

	async findById(id: string, options?: Prisma.UserArgs) {
		return await this.prisma.user.findFirst({
			where: { id, deletedAt: null },
			...(options || this.defaultOptions)
		})
	}

	async findByEmail(email: string) {
		return await this.findOne({ email })
	}

	async findByUsername(username: string) {
		return await this.findOne({ username })
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
		return this.fixAvatar((await this.findById(id, { select })) as UserWithProfile)
	}

	async findOneWithProfile(id: string) {
		const result = await this.findById(id, {
			select: { ...this.defaultOptions.select, profile: true }
		})

		return this.fixAvatar(result as UserWithProfile)
	}

	async findOneProfile(userId: string) {
		return await this.prisma.profile.findFirst({ where: { userId } })
	}

	async findPosts(id: string) {
		return await this.findById(id, { select: { posts: true } })
	}

	async updateOne(id: string, data: UpdateUserDto) {
		return await this.updateById(
			id,
			{ ...data, profile: { update: { ...data.profile } } },
			{ select: { ...this.defaultOptions.select, profile: true } }
		)
	}

	async updatePassword(id: string, password: string) {
		return await this.updateById(id, { password })
	}

	async updateEmail(id: string, email: string) {
		return await this.updateById(id, { email })
	}

	async updateAvatar(id: string, avatar: string) {
		return await this.prisma.profile.update({ where: { userId: id }, data: { avatar } })
	}

	async getCount(where: Prisma.UserWhereUniqueInput) {
		return await this.prisma.user.count({ where })
	}

	private fixAvatar(data: UserWithProfile | UserWithProfile[]): User | User[] {
		if (data) {
			if (_.isArray(data)) {
				data.map(
					(user) =>
						(user.profile.avatar = !_.isEmpty(user.profile.avatar)
							? config.settings.publicDir + user.profile.avatar
							: null)
				)
			} else {
				data.profile.avatar = !_.isEmpty(data.profile.avatar)
					? config.settings.publicDir + data.profile.avatar
					: null
			}
		}
		return data
	}
}
