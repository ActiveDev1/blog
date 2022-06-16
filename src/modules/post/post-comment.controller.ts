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
	UseGuards,
	UseInterceptors
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { LinkFixerInterceptor } from 'src/shared/interceptors/link-fixer.interceptor'
import { GetUser } from '../../shared/decorators/get-user.decorator'
import { Public } from '../../shared/decorators/public.decorator'
import { GetIdParam } from '../../shared/dtos/get-id-param.dto'
import { AuthGuard } from '../../shared/guards/auth.guard'
import { CreateCommentDto } from './dto/create-comment.dto'
import { PostCommentService } from './post-comment.service'

@ApiTags('Comment')
@Controller('posts')
@UseGuards(AuthGuard())
export class PostCommentController {
	constructor(private readonly postCommentService: PostCommentService) {}

	@Post(':id/comment')
	async create(@Param() param: GetIdParam, @Body() body: CreateCommentDto, @GetUser() user: User) {
		return await this.postCommentService.create({
			postId: param.id,
			parentId: body.parentId,
			content: body.content,
			user
		})
	}

	@Get(':id/comments')
	@Public()
	@UseInterceptors(LinkFixerInterceptor('comments'))
	async getAll(@Param() param: GetIdParam) {
		return await this.postCommentService.getAll(param.id)
	}

	@Patch('comments/:id')
	async update(
		@Param() param: GetIdParam,
		@Body() body: Pick<CreateCommentDto, 'content'>,
		@GetUser() user: User
	) {
		return await this.postCommentService.update({ id: param.id, userId: user.id }, body.content)
	}

	@Delete('comments/:id')
	@UseInterceptors(LinkFixerInterceptor('comments'))
	@HttpCode(HttpStatus.NO_CONTENT)
	async delete(@Param() param: GetIdParam, @GetUser() user: User) {
		return await this.postCommentService.delete(param.id, user.id)
	}
}
