import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { CommentMention } from './interfaces/comment-mention.interface'
import { UserConfirmation } from './interfaces/user-confirmation.interface'

@Injectable()
export class MailService {
	constructor(private mailerService: MailerService) {}

	async sendUserConfirmation({ receiver: { email }, code }: UserConfirmation) {
		await this.mailerService.sendMail({
			to: email,
			subject: 'Welcome to my App! Confirm your Email',
			template: 'signup-confirmation',
			context: {
				code
			}
		})
	}

	async sendReplyComment({ ownerName, receiver, truncatedComment }: CommentMention) {
		await this.mailerService.sendMail({
			to: receiver.email,
			subject: 'Someone replied to your comment',
			template: 'reply-comment',
			context: {
				ownerName,
				receiverName: receiver.name,
				truncatedComment
			}
		})
	}

	async sendMentionedOnComment({ ownerName, receiver, truncatedComment }: CommentMention) {
		await this.mailerService.sendMail({
			to: receiver.email,
			subject: 'You are mentioned in a comment',
			template: 'mention-in-comment',
			context: {
				ownerName,
				receiverName: receiver.name,
				truncatedComment
			}
		})
	}
}
