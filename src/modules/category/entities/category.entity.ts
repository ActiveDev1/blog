import { Category } from '@prisma/client'

export class CategoryEntity implements Category {
	id: string
	title: string
	slug: string
	createdAt: Date
	updatedAt: Date
	deletedAt: Date

	constructor(partial: Partial<CategoryEntity>) {
		Object.assign(this, partial)
	}
}
