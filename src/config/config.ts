import { JwtModuleOptions } from '@nestjs/jwt'
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
	}
}

export const jwtConfig: JwtModuleOptions = {
	secret: env.str('JWT_SECRET', 'strongSecret'),
	signOptions: { expiresIn: env.num('JWT_ACCESS_EXPIRY', 60 * 60) }
}

// export const typeOrmConfig: TypeOrmModuleOptions = {
// 	type: 'mysql',
// 	host: env.str('RDS_HOST', '127.0.0.1'),
// 	port: env.num('RDS_PORT', 3306),
// 	username: env.str('RDS_USERNAME', 'root'),
// 	password: env.str('RDS_PASSWORD', ''),
// 	database: env.str('RDS_DATABASE', 'url-shortener'),
// 	synchronize: env.bool(
// 		'TYPEORM_SYNC',
// 		environment === 'development' ? true : false
// 	),
// 	entities: [__dirname + '/../**/*.entity.js']
// 	// migrations: ['dist/migrations/*{.ts,.js}'],
// 	// migrationsTableName: 'migrations_typeorm',
// 	// migrationsRun: true
// }
