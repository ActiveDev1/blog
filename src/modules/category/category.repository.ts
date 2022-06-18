import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../services/prisma/prisma.service'

type CreateInput = Prisma.CategoryCreateInput

@Injectable()
export class CategoryRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: CreateInput) {
		return await this.prisma.category.create({ data })
	}

	async findById(id: string) {
		return await this.prisma.category.findUnique({ where: { id } })
	}

	async hasExistsWithIds(ids: string[]) {
		return (
			(await this.prisma.category.findMany({ where: { id: { in: ids } } })).length === ids.length
		)
	}

	async findBySlug(slug: string) {
		return await this.prisma.category.findUnique({ where: { slug } })
	}

	async findAll() {
		return await this.prisma.category.findMany({ where: { deletedAt: null } })
	}

	async update(id: string, data: CreateInput) {
		return await this.prisma.category.update({ where: { id }, data })
	}

	async deleteOne(id: string) {
		return this.update(id, { deletedAt: new Date() } as CreateInput)
	}
}
