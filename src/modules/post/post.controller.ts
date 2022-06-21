import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
	UseInterceptors
} from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiBody,
	ApiCreatedResponse,
	ApiForbiddenResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiTags
} from '@nestjs/swagger'
import { User } from '@prisma/client'
import { GetUser } from '../../shared/decorators/get-user.decorator'
import { Public } from '../../shared/decorators/public.decorator'
import { GetIdParam } from '../../shared/dtos/get-id-param.dto'
import { AuthGuard } from '../../shared/guards/auth.guard'
import { LinkFixerInterceptor } from '../../shared/interceptors/link-fixer.interceptor'
import { ConnectionArgsDto } from './dto/connection-args.dto'
import { CreatePostDto } from './dto/create-post.dto'
import { GetAuthorIdParam } from './dto/get-authorId-param.dto'
import { PaginationDto } from './dto/pagination.dto'
import { PostResponseDto } from './dto/responses/response.post.dto'
import { UserPostsResponseDto } from './dto/responses/response.user.posts.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { PostService } from './post.service'

@ApiTags('Post')
@Controller('posts')
@UseGuards(AuthGuard())
export class PostController {
	constructor(private readonly postService: PostService) {}

	@Post()
	@ApiBearerAuth()
	@ApiBody({ type: CreatePostDto })
	@ApiCreatedResponse({
		description: 'New post created'
	})
	async create(@Body() body: CreatePostDto, @GetUser() user: User) {
		return await this.postService.create(body, user)
	}

	@Get('page')
	@Public()
	async findPage(@Query() connectionArgs: ConnectionArgsDto) {
		return this.postService.findPage(connectionArgs)
	}

	@Get()
	@Public()
	// @UseInterceptors(LinkFixerInterceptor('posts'))
	async findPublics(@Query() query: PaginationDto) {
		return await this.postService.findPublics(query)
	}

	@Get('author/:authorId')
	@Public()
	@UseInterceptors(LinkFixerInterceptor('posts'))
	@ApiNotFoundResponse({
		description: 'User not found'
	})
	@ApiOkResponse({
		type: UserPostsResponseDto
	})
	async findAll(@Param() param: GetAuthorIdParam) {
		return await this.postService.findAll(param.authorId)
	}

	@Get(':id')
	@Public()
	@UseInterceptors(LinkFixerInterceptor('post'))
	@ApiNotFoundResponse({
		description: 'Post not found'
	})
	@ApiOkResponse({
		type: PostResponseDto
	})
	async findOne(@Param() param: GetIdParam) {
		return await this.postService.findOne(param.id)
	}

	@Patch(':id')
	@ApiBearerAuth()
	@ApiBody({ type: UpdatePostDto })
	@ApiNotFoundResponse({
		description: 'Post not found'
	})
	@ApiForbiddenResponse({
		description: `Can't access the post`
	})
	@ApiOkResponse({
		type: PostResponseDto
	})
	async update(@Param() param: GetIdParam, @Body() body: UpdatePostDto, @GetUser() user: User) {
		return await this.postService.update({ id: param.id, authorId: user.id }, body)
	}

	@Delete(':id')
	@ApiBearerAuth()
	@ApiNotFoundResponse({
		description: 'Post not found'
	})
	@ApiForbiddenResponse({
		description: `Can't access the post`
	})
	@ApiOkResponse({
		type: PostResponseDto
	})
	async delete(@Param() param: GetIdParam, @GetUser() user: User) {
		return await this.postService.delete({ id: param.id, authorId: user.id })
	}

	@Post(':id/like')
	async like(@Param() param: GetIdParam, @GetUser() user: User) {
		return await this.postService.like({ postId: param.id, userId: user.id })
	}

	@Get(':id/like/users')
	@Public()
	@UseInterceptors(LinkFixerInterceptor('users'))
	async getUserLikes(@Param() param: GetIdParam) {
		return await this.postService.getUserLikes(param.id)
	}

	@Get(':id/likes')
	@Public()
	async getLikesCount(@Param() param: GetIdParam) {
		return await this.postService.getLikesCount(param.id)
	}
}
