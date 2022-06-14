import { MailerModule } from '@nestjs-modules/mailer'
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter'
import { Module } from '@nestjs/common'
import { join } from 'path'
import { mailerConfig } from '../../../shared/config'
import { MailService } from './mail.service'

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
