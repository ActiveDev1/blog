import Bull from 'bull'

export interface Job {
	data: any
	name: string
	opts?: Omit<Bull.JobOptions, 'repeat'>
}
