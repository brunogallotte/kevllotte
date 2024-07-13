import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Tag, type TagProps } from '@/domain/blog/enterprise/entities/tag'
import { PrismaPostTagMapper } from '@/infra/database/prisma/mappers/prisma-post-tag-mapper'
import { prisma } from '@/lib/prisma'

export function makePostTag(
  override: Partial<TagProps> = {},
  id?: UniqueEntityID,
) {
  const postTag = Tag.create(
    {
      name: faker.lorem.words(2),
      postId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return postTag
}

export class PostTagFactory {
  async makePrismaPostTag(data: Partial<TagProps> = {}): Promise<Tag> {
    const postTag = makePostTag(data)

    await prisma.tag.create({
      data: PrismaPostTagMapper.toPrisma(postTag),
    })

    return postTag
  }
}
