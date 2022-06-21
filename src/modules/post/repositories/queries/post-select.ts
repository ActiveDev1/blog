import { Prisma } from '@prisma/client'

const postSelect: Prisma.PostSelect = {
	id: true,
	title: true,
	description: true,
	slug: true,
	cover: true,
	_count: { select: { likes: true } },
	author: {
		select: {
			id: true,
			name: true,
			username: true,
			profile: {
				select: { avatar: true }
			}
		}
	},
	createdAt: true,
	updatedAt: true
}

export default postSelect
