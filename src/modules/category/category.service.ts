import { Injectable } from '@nestjs/common'
import { slugify } from 'src/shared/utils/helpers/functions'
import { CategoryRepository } from './category.repository'
import { CreateCategoryDto } from './dto/create-category.dto'
import { CategoryNotFound } from './errors/category-not-found'
import { DuplicateCategory } from './errors/duplicate-category'

@Injectable()
export class CategoryService {
	constructor(private readonly categoryRepository: CategoryRepository) {}

	async create({ title }: CreateCategoryDto) {
		const slug = slugify(title)
		const category = await this.categoryRepository.findBySlug(slug)

		if (category) {
			throw new DuplicateCategory()
		}

		return await this.categoryRepository.create({ title, slug })
	}

	async findAll() {
		return await this.categoryRepository.findAll()
	}

	async update(id: string, title: string) {
		const slug = slugify(title)
		const [category1, category2] = await Promise.all([
			this.categoryRepository.findById(id),
			this.categoryRepository.findBySlug(slug)
		])

		if (!category1) {
			throw new CategoryNotFound()
		}

		if (category2) {
			throw new DuplicateCategory()
		}

		return await this.categoryRepository.update(id, { title, slug })
	}

	async delete(id: string) {
		const category = await this.categoryRepository.findById(id)

		if (!category) {
			throw new CategoryNotFound()
		}

		await this.categoryRepository.deleteOne(id)
	}
}
