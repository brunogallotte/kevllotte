import type { Post as PrismaPost } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Post, POST_STATUS } from '@/domain/blog/enterprise/entities/post'
import { Slug } from '@/domain/blog/enterprise/entities/value-objects/slug'

export class PrismaPostMapper {
  static toDomain(raw: PrismaPost): Post {
    return Post.create(
      {
        title: raw.title,
        content: raw.content,
        authorId: new UniqueEntityID(raw.userId),
        status: POST_STATUS[raw.status],
        collabId: raw.collabId ? new UniqueEntityID(raw.collabId) : undefined,
        slug: Slug.create(raw.slug),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }
}
