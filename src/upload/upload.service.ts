import { Injectable } from '@nestjs/common'
import { BufferedFile } from '../shared/interfaces/buffered-file.interface'
import { MinioService } from '../minio/minio.service'
import { UserRepository } from '../user/users.repository'
import { User } from '@prisma/client'

@Injectable()
export class UploadService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly minioService: MinioService
	) {}

	async updateUserAvatar(user: User, file: BufferedFile) {
		const { avatar } = await this.userRepository.findOneProfile(user.id)
		const { fileDirectory, url } = await this.minioService.upload({
			file,
			parentDir: 'users',
			objectName: avatar
		})
		await this.userRepository.updateAvatar(user.id, fileDirectory)
		return url
	}
}
