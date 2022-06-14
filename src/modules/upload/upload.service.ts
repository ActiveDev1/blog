import { ForbiddenException, Injectable } from '@nestjs/common'
import * as _ from 'lodash'
import { PostNotFound } from '../../shared/errors/post-not-found'
import { MinioService } from '../../modules/services/minio/minio.service'
import { UserFile } from '../../shared/interfaces/user-file.interface'
import { PostRepository } from '../post/post.repository'
import { UserRepository } from '../user/users.repository'

@Injectable()
export class UploadService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly postRepository: PostRepository,
		private readonly minioService: MinioService
	) {}

	async updateUserAvatar({ userId, file }: UserFile) {
		const { avatar } = await this.userRepository.findOneProfile(userId)
		const { fileDirectory, url } = await this.minioService.upload({
			file,
			parentDir: 'users/avatars',
			objectName: avatar
		})

		if (!_.isEmpty(fileDirectory)) {
			await this.userRepository.updateAvatar(userId, fileDirectory)
		}

		return url
	}

	async updatePostCover({ userId, file }: UserFile, postId: string) {
		const post = await this.postRepository.findById(postId)

		if (!post) {
			throw new PostNotFound()
		}

		if (post.authorId !== userId) {
			throw new ForbiddenException()
		}

		const { fileDirectory, url } = await this.minioService.upload({
			file,
			parentDir: 'posts/covers',
			objectName: post.cover
		})

		if (!_.isEmpty(fileDirectory)) {
			await this.postRepository.updateCover(postId, fileDirectory)
		}

		return url
	}
}
