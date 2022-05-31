import { MailerOptions } from '@nestjs-modules/mailer'
import { JwtModuleOptions } from '@nestjs/jwt'
import { NestMinioOptions } from 'nestjs-minio'
import { RedisModuleOptions } from 'nestjs-redis'
import * as path from 'path'
import * as env from '../common/utils/environment'

const environment = env.str('NODE_ENV', 'development')

export const config = {
	environment,
	appName: 'blog-service',
	logger: {
		database: {
			enabled: env.bool('DATABASE_LOG', true)
		},
		server: {
			enabled: env.bool('REST_LOGGER', true),
			prettyPrint: env.bool('REST_LOGGER_Pretty', true)
		}
	},
	rootDir: path.resolve(''),
	server: {
		restApi: {
			host: env.str('REST_HOST', '0.0.0.0'),
			port: env.num('REST_PORT', 3000)
		}
	},
	settings: {
		publicDir: env.str('PUBLIC_DIR', 'http://localhost:9000/blog/'),
		signupCodeExpireTime: env.num('SIGNUP_CODE_EXPIRE_TIME', 60 * 5),
		upload: {
			maxAvatarFileSize: env.num('AVATAR_FILE_SIZE_LIMIT', 1 * 1024 * 1024)
		}
	}
}

export const redisConfig: RedisModuleOptions = {
	host: env.str('REDIS_HOST', '127.0.0.1'),
	port: env.num('REDIS_PORT', 6379),
	password: env.str('REDIS_PASS', ''),
	db: env.num('REDIS_DB', 0),
	onClientReady: (client) => {
		client.on('connect', () => {
			console.info('\u001b[1;36mredis:info', '\u001b[1;39mStarting a redis connection.')
		})
		client.on('error', (error) => {
			console.error('\u001b[1;36mredis:error', `\u001b[1;39m ${error}`)
		})
	}
}

export const jwtConfig: JwtModuleOptions = {
	secret: env.str('JWT_SECRET', 'PRTjGu6ZjR2ykHmPrMgcRaUE'),
	signOptions: { expiresIn: env.num('JWT_ACCESS_EXPIRY', 24 * 60 * 60) }
}

export const refreshTokenConfig: JwtModuleOptions = {
	secret: env.str('JWT_REFRESH_SECRET', 'cftT6ZErGgDUJQCVCeEBn2k7'),
	signOptions: { expiresIn: env.num('JWT_REFRESH_EXPIRY', 30 * 24 * 60 * 60) }
}

export const mailerConfig: MailerOptions = {
	transport: {
		host: env.str('MAILER_HOST', 'smtp.mailtrap.io'),
		port: env.num('MAILER_PORT', 2525),
		auth: {
			user: env.str('MAILER_USER', '043b6ba33c1069'),
			pass: env.str('MAILER_PASS', 'fabf1b61c51212')
		}
	},
	defaults: {
		from: env.str('MAILER_FROM_DEFAULT', '"No Reply" <noreply@example.com>')
	}
}

export const NestMinioConfigs = {
	config: {
		endPoint: env.str('MINIO_ENDPOINT', '127.0.0.1'),
		port: env.num('MINIO_PORT', 9000),
		useSSL: env.bool('MINIO_SSL', false),
		accessKey: env.str('MINIO_ACCESS_KEY', 'minioadmin'),
		secretKey: env.str('MINIO_SECRET_KEY', 'minioadmin')
	} as NestMinioOptions,
	bucket: env.str('MINIO_BUCKET_NAME', 'blog')
}
