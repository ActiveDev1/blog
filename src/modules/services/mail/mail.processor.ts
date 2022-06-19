import { MailerService } from '@nestjs-modules/mailer'
import { Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'
import { Comment } from './interfaces/comment-mention.interface'
import { UserConfirmation } from './interfaces/user-confirmation.interface'

@Processor('mailer')
export class MailProcessor {
	constructor(private mailerService: MailerService) {}

	@Process('user-confirmation')
	async sendUserConfirmation(job: Job<UserConfirmation>) {
		const { code, receiver } = job.data
		await this.mailerService.sendMail({
			to: receiver.email,
			subject: 'Welcome to my App! Confirm your Email',
			template: 'signup-confirmation',
			context: {
				code
			}
		})
	}

	@Process('comment-on-post')
	async sendCommentOnPost(job: Job<Comment>) {
		const { ownerName, receiver, truncatedComment, postTitle } = job.data
		await this.mailerService.sendMail({
			to: receiver.email,
			subject: 'Someone posted a comment for your post',
			template: 'comment-post',
			context: {
				ownerName,
				receiverName: receiver.name,
				truncatedComment,
				postTitle
			}
		})
	}

	@Process('reply-comment')
	async sendReplyComment(job: Job<Comment>) {
		const { ownerName, receiver, truncatedComment, postTitle } = job.data
		await this.mailerService.sendMail({
			to: receiver.email,
			subject: 'Someone replied to your comment',
			template: 'reply-comment',
			context: {
				ownerName,
				receiverName: receiver.name,
				truncatedComment,
				postTitle
			}
		})
	}

	@Process('mention-on-comment')
	async sendMentionedOnComment(job: Job<Comment>) {
		const { ownerName, receiver, truncatedComment, postTitle } = job.data
		await this.mailerService.sendMail({
			to: receiver.email,
			subject: 'You are mentioned in a comment',
			template: 'mention-in-comment',
			context: {
				ownerName,
				receiverName: receiver.name,
				truncatedComment,
				postTitle
			}
		})
	}
}
