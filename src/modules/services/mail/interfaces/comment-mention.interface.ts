import { Receiver } from './receiver.interface'

export interface Comment {
	receiver: Receiver
	ownerName: string
	postTitle: string
	truncatedComment: string
}
