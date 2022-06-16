import { Receiver } from './receiver.interface'

export interface CommentMention {
	receiver: Receiver
	ownerName: string
	truncatedComment: string
}
