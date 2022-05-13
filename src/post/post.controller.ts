import { Controller, Get, Post, Body, Param, UseGuards, Patch, Delete } from '@nestjs/common'
import { PostService } from './post.service'
import { CreatePostDto } from './dto/create-post.dto'
import {
	ApiBearerAuth,
	ApiBody,
	ApiCreatedResponse,
	ApiForbiddenResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiTags
} from '@nestjs/swagger'
import { GetUser } from '../shared/decorators/get-user.decorator'
import { Public } from '../shared/decorators/public.decorator'
import { User } from '@prisma/client'
import { AuthGuard } from '../shared/guards/auth.guard'
import { GetPostIdParam } from './dto/get-post-id-param.dto'
import { GetUserIdParam } from './dto/get-user-id-param.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { ResponsePostDto } from './dto/responses/response.post.dto'
import { ResponseUserPostsDto } from './dto/responses/response.user.posts.dto'

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
	async create(@Body() createPostDto: CreatePostDto, @GetUser() user: User) {
		return await this.postService.create(createPostDto, user)
	}

	@Get('author/:authorId')
	@Public()
	@ApiNotFoundResponse({
		description: 'User not found'
	})
	@ApiOkResponse({
		type: ResponseUserPostsDto
	})
	async findAll(@Param() getParam: GetUserIdParam) {
		return await this.postService.findAll(getParam.authorId)
	}

	@Get(':id')
	@Public()
	@ApiNotFoundResponse({
		description: 'Post not found'
	})
	@ApiOkResponse({
		type: ResponsePostDto
	})
	async findOne(@Param() getParam: GetPostIdParam) {
		return await this.postService.findOne(getParam.id)
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
		type: ResponsePostDto
	})
	async update(
		@Param() getPostIdDto: GetPostIdParam,
		@Body() updatePostDto: UpdatePostDto,
		@GetUser() user: User
	) {
		return await this.postService.update({ id: getPostIdDto.id, authorId: user.id }, updatePostDto)
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
		type: ResponsePostDto
	})
	async delete(@Param() getPostIdDto: GetPostIdParam, @GetUser() user: User) {
		return await this.postService.delete({ id: getPostIdDto.id, authorId: user.id })
	}
}
