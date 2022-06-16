import { Receiver } from './receiver.interface'

export interface UserConfirmation {
	receiver: Receiver
	code: number
}
