import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Post,
  POST_STATUS,
  type PostProps,
} from '@/domain/blog/enterprise/entities/post'

export function makePost(
  override: Partial<PostProps> = {},
  id?: UniqueEntityID,
) {
  const post = Post.create(
    {
      authorId: new UniqueEntityID(),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      status: POST_STATUS.DRAFT,
      ...override,
    },
    id,
  )

  return post
}
