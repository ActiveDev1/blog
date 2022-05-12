import { Controller, Get, Post, Body, Param, UseGuards, Patch, Delete } from '@nestjs/common'
import { PostService } from './post.service'
import { CreatePostDto } from './dto/create-post.dto'
import { ApiTags } from '@nestjs/swagger'
import { GetUser } from '../shared/decorators/get-user.decorator'
import { Public } from '../shared/decorators/public.decorator'
import { User } from '@prisma/client'
import { AuthGuard } from '../shared/guards/auth.guard'
import { GetPostIdParam } from './dto/get-post-id-param.dto'
import { GetUserIdParam } from './dto/get-user-id-param.dto'
import { UpdatePostDto } from './dto/update-post.dto'

@ApiTags('Post')
@Controller('posts')
@UseGuards(AuthGuard())
export class PostController {
	constructor(private readonly postService: PostService) {}

	@Post()
	async create(@Body() createPostDto: CreatePostDto, @GetUser() user: User) {
		return await this.postService.create(createPostDto, user)
	}

	@Get('author/:authorId')
	@Public()
	async findAll(@Param() getParam: GetUserIdParam) {
		return await this.postService.findAll(getParam.authorId)
	}

	@Get(':id')
	@Public()
	async findOne(@Param() getParam: GetPostIdParam) {
		return await this.postService.findOne(getParam.id)
	}

	@Patch(':id')
	async update(
		@Param() getPostIdDto: GetPostIdParam,
		@Body() updatePostDto: UpdatePostDto,
		@GetUser() user: User
	) {
		return await this.postService.update({ id: getPostIdDto.id, authorId: user.id }, updatePostDto)
	}

	@Delete(':id')
	async delete(@Param() getPostIdDto: GetPostIdParam, @GetUser() user: User) {
		return await this.postService.delete({ id: getPostIdDto.id, authorId: user.id })
	}
}
