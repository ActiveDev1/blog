import { Body, Controller, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { GetIdParam } from '../../shared/dtos/get-id-param.dto'
import { GetUser } from '../../shared/decorators/get-user.decorator'
import { AuthGuard } from '../../shared/guards/auth.guard'
import { CreateCommentDto } from './dto/create-comment.dto'
import { PostCommentService } from './post-comment.service'
import { Public } from '../../shared/decorators/public.decorator'
import { LinkFixerInterceptor } from 'src/shared/interceptors/link-fixer.interceptor'

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
			userId: user.id
		})
	}

	@Get(':id/comments')
	@Public()
	@UseInterceptors(LinkFixerInterceptor('comments'))
	async getAll(@Param() param: GetIdParam) {
		return await this.postCommentService.getAll(param.id)
	}
}
