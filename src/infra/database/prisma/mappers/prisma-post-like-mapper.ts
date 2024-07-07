import type { PostLike as PrismaPostLike, Prisma } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PostLike } from '@/domain/blog/enterprise/entities/post-like'

export class PrismaPostLikeMapper {
  static toDomain(raw: PrismaPostLike): PostLike {
    return PostLike.create(
      {
        authorId: new UniqueEntityID(raw.userId),
        postId: new UniqueEntityID(raw.postId),
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(postLike: PostLike): Prisma.PostLikeUncheckedCreateInput {
    return {
      id: postLike.id.toString(),
      postId: postLike.postId.toString(),
      userId: postLike.authorId.toString(),
      createdAt: postLike.createdAt,
    }
  }
}
