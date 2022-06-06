import { Injectable, OnModuleInit } from '@nestjs/common'
import { NestMinioService } from 'nestjs-minio'
import { BufferedFile } from '../shared/interfaces/buffered-file.interface'
import { NestMinioConfigs } from '../config'
import { extname } from 'path'
import { ErrorUploadFile } from './errors/error-upload-file'
import { ErrorDeleteFile } from './errors/error-delete-file'
import * as crypto from 'crypto'

type dirType = 'users/avatars' | 'users/covers' | 'posts/covers'

interface FileInfo {
	file: BufferedFile
	parentDir: dirType
	objectName?: string
}

@Injectable()
export class MinioService implements OnModuleInit {
	private readonly bucketName = NestMinioConfigs.bucket
	private readonly baseUrl = `${NestMinioConfigs.config.endPoint}:${NestMinioConfigs.config.port}/`

	constructor(private readonly minio: NestMinioService) {}

	private get client() {
		return this.minio.getMinio()
	}
	onModuleInit() {
		this.initBucket()
	}

	async initBucket() {
		this.client.bucketExists(this.bucketName, (err, result) => {
			if (err) throw err
			if (!result) {
				this.client.makeBucket(this.bucketName, 'middle-east', (err) => {
					if (err) throw err
					console.log(
						`\u001b[1;36mminio:info', '\u001b[1;39mBucket (${this.bucketName}) created successfully`
					)
				})
			}
		})
		console.log(`\u001b[1;36mminio:info ` + `\u001b[1;39mStarting a minio connection.`)
	}

	async upload(fileInfo: FileInfo, bucketName: string = this.bucketName) {
		const { file, parentDir } = fileInfo
		const objectName =
			fileInfo.objectName || this.getObjectName(parentDir, this.editFileName(file.originalname))

		this.client.putObject(bucketName, objectName, file.buffer, (err) => {
			if (err) throw new ErrorUploadFile()
		})

		return { url: this.baseUrl + objectName, fileDirectory: objectName }
	}

	async delete(objetName: string, bucketName: string = this.bucketName) {
		this.client.removeObject(bucketName, objetName, (err) => {
			if (err) throw new ErrorDeleteFile()
		})
	}

	private editFileName(originalname: string) {
		const timestamp = Date.now().toString()
		const hashedFileName = crypto.createHash('md5').update(timestamp).digest('hex')
		const fileExtName = extname(originalname)
		return hashedFileName + fileExtName
	}

	private getObjectName(dir: dirType, fileName: string) {
		return fileName || `${dir}/${this.editFileName(fileName)}`
	}
}
