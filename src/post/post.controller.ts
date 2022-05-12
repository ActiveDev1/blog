import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	UseGuards,
	Patch
} from '@nestjs/common'
import { PostService } from './post.service'
import { CreatePostDto } from './dto/create-post.dto'
import { ApiTags } from '@nestjs/swagger'
import { GetUser } from '../auth/decorators/get-user.decorator'
import { User } from '@prisma/client'
import { AuthGuard } from '@nestjs/passport'
import { GetPostIdParam } from './dto/get-post-id-param.dto'
import { GetUserIdParam } from './dto/get-user-id-param.dto'
import { UpdatePostDto } from './dto/update-post.dto'

@ApiTags('Post')
@Controller('posts')
export class PostController {
	constructor(private readonly postService: PostService) {}

	@Post()
	@UseGuards(AuthGuard('jwt'))
	async create(@Body() createPostDto: CreatePostDto, @GetUser() user: User) {
		return await this.postService.create(createPostDto, user)
	}

	@Get('author/:authorId')
	async findAll(@Param() getUserIdDto: GetUserIdParam) {
		return await this.postService.findAll(getUserIdDto.authorId)
	}

	@Get(':id')
	async findOne(@Param() getPostIdDto: GetPostIdParam) {
		return await this.postService.findOne(getPostIdDto.id)
	}

	@Patch(':id')
	@UseGuards(AuthGuard('jwt'))
	update(
		@Param() getPostIdDto: GetPostIdParam,
		@Body() updatePostDto: UpdatePostDto,
		@GetUser() user: User
	) {
		return this.postService.update(
			{ id: getPostIdDto.id, authorId: user.id },
			updatePostDto
		)
	}
}
