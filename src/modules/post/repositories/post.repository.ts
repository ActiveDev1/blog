import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../../services/prisma/prisma.service'
import { CreatePost } from '../interfaces/create-post.interface'
import { IPost } from '../interfaces/post.interface'
import { UpdatePost } from '../interfaces/update-post.interface'
import { ConnectionArgs } from '../page/connection-args.dto'

@Injectable()
export class PostRepository {
	defaultWhere: Prisma.PostWhereInput = { deletedAt: null, isPublished: true }

	constructor(private readonly prisma: PrismaService) {}

	async create(createPost: CreatePost, authorId: string) {
		return await this.prisma.post.create({
			data: { ...createPost, authorId, categories: { create: createPost.categories } }
		})
	}

	async findById(id: string, includeOption?: Prisma.PostInclude) {
		return await this.prisma.post.findFirst({
			where: { id, ...this.defaultWhere },
			include: includeOption
		})
	}

	async findOneWithAuthor(id: string) {
		return (await this.findById(id, { author: true })) as IPost
	}

	async findPage(connectionArgs: ConnectionArgs) {
		const where: Prisma.PostWhereInput = {
			isPublished: true
		}
		const userArgs: Prisma.UserArgs = {
			select: {
				id: true,
				name: true,
				username: true,
				profile: {
					select: { avatar: true }
				}
			}
		}
		const postSelect: Prisma.PostSelect = {
			id: true,
			title: true,
			description: true,
			slug: true,
			cover: true,
			_count: { select: { likes: true } },
			author: userArgs,
			createdAt: true,
			updatedAt: true
		}
		const postPage = await findManyCursorConnection(
			(args) =>
				this.prisma.post.findMany({
					...args,
					where: where,
					select: postSelect
				}),
			() => this.prisma.post.count({ where: where }),
			connectionArgs
		)
		return postPage
	}

	async findAllByUserId(userId: string) {
		return await this.prisma.post.findMany({
			where: { authorId: userId, ...this.defaultWhere }
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
