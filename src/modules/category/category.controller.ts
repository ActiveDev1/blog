import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator'
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
	UnauthorizedException,
	UseGuards
} from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiNoContentResponse,
	ApiOkResponse,
	ApiTags,
	ApiUnprocessableEntityResponse
} from '@nestjs/swagger'
import { Role } from '../../shared/decorators/roles.decorator'
import { GetIdParam } from '../../shared/dtos/get-id-param.dto'
import { Role as Roles } from '../../shared/enums/role.enum'
import { AuthGuard } from '../../shared/guards/auth.guard'
import { RolesGuard } from '../../shared/guards/roles.guard'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { CategoryEntity } from './entities/category.entity'

@Controller('category')
@ApiTags('Category')
@UseGuards(AuthGuard(), RolesGuard)
@ApiBearerAuth('access-token')
@ApiException(() => UnauthorizedException, { description: 'User is not authorized' })
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post()
	@Role(Roles.ADMIN)
	@ApiCreatedResponse({
		description: 'Category created',
		type: CategoryEntity
	})
	@ApiUnprocessableEntityResponse({
		description: 'Duplicate category'
	})
	async create(@Body() createCategoryDto: CreateCategoryDto) {
		return await this.categoryService.create(createCategoryDto)
	}

	@Get()
	@ApiOkResponse({
		description: 'Find all categories',
		type: [CategoryEntity]
	})
	async findAll() {
		return await this.categoryService.findAll()
	}

	@Patch('/:id')
	@Role(Roles.ADMIN)
	@ApiOkResponse({
		description: 'Category updated',
		type: CategoryEntity
	})
	async update(@Param() param: GetIdParam, @Body() body: UpdateCategoryDto) {
		return await this.categoryService.update(param.id, body.title)
	}

	@Delete('/:id')
	@Role(Roles.ADMIN)
	@ApiNoContentResponse({
		description: 'Category deleted'
	})
	@HttpCode(HttpStatus.NO_CONTENT)
	async delete(@Param() param: GetIdParam) {
		return await this.categoryService.delete(param.id)
	}
}
