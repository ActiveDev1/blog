import { BufferedFile } from '../../shared/interfaces/buffered-file.interface'
import { config } from '../../config'
import { FileSizeTooLarge } from '../errors/file-size-too-large'
import { UnsupportedFileType } from '../errors/unsupported-file-type'

export const avatarFileFilter = (_req: Request, file: BufferedFile, callback: Function) => {
	if (file.size > config.settings.upload.maxAvatarFileSize) {
		callback(new FileSizeTooLarge(), false)
	}

	if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
		return callback(new UnsupportedFileType(), false)
	}

	callback(null, true)
}
