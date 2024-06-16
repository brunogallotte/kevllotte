import { faker } from '@faker-js/faker'
import type { Post } from '@prisma/client'
import { randomUUID } from 'crypto'

export function makePost(override?: Partial<Post>) {
  const post: Post = {
    id: randomUUID(),
    title: faker.lorem.words(5),
    content: faker.lorem.sentence(10),
    status: 'DRAFT',
    userId: randomUUID(),
    collabId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...override,
  }

  return post
}
