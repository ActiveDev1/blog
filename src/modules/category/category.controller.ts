import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
	UseGuards
} from '@nestjs/common'
import { GetIdParam } from '../../shared/dtos/get-id-param.dto'
import { Role } from '../../shared/decorators/roles.decorator'
import { Role as Roles } from '../../shared/enums/role.enum'
import { AuthGuard } from '../../shared/guards/auth.guard'
import { RolesGuard } from '../../shared/guards/roles.guard'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Controller('category')
@UseGuards(AuthGuard(), RolesGuard)
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post()
	@Role(Roles.ADMIN)
	async create(@Body() createCategoryDto: CreateCategoryDto) {
		return await this.categoryService.create(createCategoryDto)
	}

	@Get()
	async findAll() {
		return await this.categoryService.findAll()
	}

	@Patch('/:id')
	@Role(Roles.ADMIN)
	async update(@Param() param: GetIdParam, @Body() body: UpdateCategoryDto) {
		return await this.categoryService.update(param.id, body.title)
	}

	@Delete('/:id')
	@Role(Roles.ADMIN)
	@HttpCode(HttpStatus.NO_CONTENT)
	async delete(@Param() param: GetIdParam) {
		return await this.categoryService.delete(param.id)
	}
}
