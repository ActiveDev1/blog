import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {
	FastifyAdapter,
	NestFastifyApplication
} from '@nestjs/platform-fastify'
import { ValidationPipe } from '@nestjs/common'
import { config } from './config'
import { TransformInterceptor } from './common/interceptors/response-transform.interceptor'

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter({
			logger: config.server.restApi.logger
				? { prettyPrint: { colorize: true } }
				: false
		})
	)
	app.useGlobalInterceptors(new TransformInterceptor())
	app.useGlobalPipes(new ValidationPipe())
	await app.listen(config.server.restApi.port, config.server.restApi.host)
}

bootstrap()
