import { MailerOptions } from '@nestjs-modules/mailer'
import { JwtModuleOptions } from '@nestjs/jwt'
import { RedisModuleOptions } from 'nestjs-redis'
import * as path from 'path'
import * as env from '../utils/environment'

const environment = env.str('NODE_ENV', 'development')
const debugStatus = env.bool('DEBUG', true)
const debugPrefix = `blog-service-${environment} `

if (debugPrefix) {
	process.env.DEBUG = debugPrefix
}

export const config = {
	environment,
	appName: 'blog-service',
	debug: {
		enabled: debugStatus,
		prefix: debugPrefix
	},
	logger: {
		level: env.str('LOG_LEVEL', 'silly')
	},
	rootDir: path.resolve(''),
	server: {
		restApi: {
			host: env.str('REST_HOST', '0.0.0.0'),
			port: env.num('REST_PORT', 3000),
			logger: env.bool('REST_LOGGER', true)
		}
	},
	settings: {
		signupCodeExpireTime: env.num('SIGNUP_CODE_EXPIRE_TIME', 60 * 5)
	}
}

export const redisConfig: RedisModuleOptions = {
	host: env.str('REDIS_HOST', '127.0.0.1'),
	port: env.num('REDIS_PORT', 6379),
	password: env.str('REDIS_PASS', ''),
	db: env.num('REDIS_DB', 0),
	onClientReady: (client) => {
		client.on('connect', () => {
			console.info(
				'\u001b[1;36mredis:info',
				'\u001b[1;39mStarting a redis connection.'
			)
		})
		client.on('error', (error) => {
			console.error('\u001b[1;36mredis:error', `\u001b[1;39m ${error}`)
		})
	}
}

export const jwtConfig: JwtModuleOptions = {
	secret: env.str('JWT_SECRET', 'strongSecret'),
	signOptions: { expiresIn: env.num('JWT_ACCESS_EXPIRY', 60 * 60) }
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
