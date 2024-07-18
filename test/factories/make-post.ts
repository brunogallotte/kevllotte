import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Post,
  POST_STATUS,
  type PostProps,
} from '@/domain/blog/enterprise/entities/post'
import { PrismaPostMapper } from '@/infra/database/prisma/mappers/prisma-post-mapper'
import { PrismaSavedPostMapper } from '@/infra/database/prisma/mappers/prisma-saved-post-mapper'
import { prisma } from '@/lib/prisma'

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

export class PostFactory {
  async makePrismaPost(data: Partial<PostProps> = {}): Promise<Post> {
    const post = makePost(data)

    await prisma.post.create({
      data: PrismaPostMapper.toPrisma(post),
    })

    return post
  }

  // async makePrismaSavedPost(data: Partial<PostProps> = {}): Promise<Post> {
  //   const savedPost = makePost(data)

  //   await prisma.savedPost.create({
  //     data: PrismaSavedPostMapper.toPrisma(savedPost),
  //   })

  //   return savedPost
  // }
}
