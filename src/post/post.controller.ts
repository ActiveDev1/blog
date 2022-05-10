import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards
} from '@nestjs/common'
import { PostService } from './post.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { ApiTags } from '@nestjs/swagger'
import { GetUser } from 'src/auth/decorators/get-user.decorator'
import { User } from '@prisma/client'
import { AuthGuard } from '@nestjs/passport'
import { GetPostIdDto } from './dto/get-post-id.dto'

@ApiTags('Post')
@Controller('post')
export class PostController {
	constructor(private readonly postService: PostService) {}

	@Post()
	@UseGuards(AuthGuard('jwt'))
	async create(@Body() createPostDto: CreatePostDto, @GetUser() user: User) {
		return await this.postService.create(createPostDto, user)
	}

	@Get()
	findAll() {
		return this.postService.findAll()
	}

	@Get(':id')
	async findOne(@Param() getPostIdDto: GetPostIdDto) {
		return this.postService.findOne(getPostIdDto.id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
		return this.postService.update(+id, updatePostDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.postService.remove(+id)
	}
}
