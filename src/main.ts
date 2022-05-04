import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {
	FastifyAdapter,
	NestFastifyApplication
} from '@nestjs/platform-fastify'
import { ValidationError, ValidationPipe } from '@nestjs/common'
import { config } from './config'
import { TransformInterceptor } from './shared/interceptors/response-transform.interceptor'
import {
	ValidationException,
	ValidationFilter
} from './shared/filters/validation.filter'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter({
			logger: config.server.restApi.logger
				? { prettyPrint: { colorize: true } }
				: false
		})
	)
	app.setGlobalPrefix('api')
	app.useGlobalInterceptors(new TransformInterceptor())
	app.useGlobalFilters(new ValidationFilter())
	app.useGlobalPipes(
		new ValidationPipe({
			skipMissingProperties: false,
			exceptionFactory: (errors: ValidationError[]) => {
				const errMsg = {}
				errors.forEach((err) => {
					errMsg[err.property] = [...Object.values(err.constraints)]
				})
				return new ValidationException(errMsg)
			}
		})
	)

	const configDocument = new DocumentBuilder()
		.setTitle('Blog Service')
		.setDescription('The Blog APIs document')
		.setVersion('1.0')
		.build()
	const document = SwaggerModule.createDocument(app, configDocument)
	SwaggerModule.setup('swagger', app, document)

	await app.listen(config.server.restApi.port, config.server.restApi.host)
}

bootstrap()
