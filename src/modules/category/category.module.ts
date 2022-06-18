import { Module } from '@nestjs/common'
import { CategoryController } from './category.controller'
import { CategoryRepository } from './category.repository'
import { CategoryService } from './category.service'

@Module({
	controllers: [CategoryController],
	providers: [CategoryService, CategoryRepository]
})
export class CategoryModule {}
