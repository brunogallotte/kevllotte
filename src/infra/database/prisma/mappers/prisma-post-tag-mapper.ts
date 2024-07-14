import { type Prisma, Tag as PrismaPostTag } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Tag } from '@/domain/blog/enterprise/entities/tag'

export class PrismaPostTagMapper {
  static toDomain(raw: PrismaPostTag): Tag {
    return Tag.create(
      {
        name: raw.name,
        postId: new UniqueEntityID(raw.postId),
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(postTag: Tag): Prisma.TagUncheckedCreateInput {
    return {
      id: postTag.id.toString(),
      name: postTag.name,
      postId: postTag.postId.toString(),
      createdAt: postTag.createdAt,
    }
  }
}
