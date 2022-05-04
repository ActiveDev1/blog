import { MailerModule } from '@nestjs-modules/mailer'
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter'
import { Module } from '@nestjs/common'
import { MailService } from './mail.service'
import { join } from 'path'
import { mailerConfig } from '../config'

@Module({
	imports: [
		MailerModule.forRoot({
			...mailerConfig,
			template: {
				dir: join(__dirname, 'templates'),
				adapter: new EjsAdapter(),
				options: {
					strict: false
				}
			}
		})
	],
	providers: [MailService],
	exports: [MailService]
})
export class MailModule {}
