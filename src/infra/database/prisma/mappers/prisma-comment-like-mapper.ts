import type { CommentLike as PrismaCommentLike, Prisma } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CommentLike } from '@/domain/blog/enterprise/entities/comment-like'

export class PrismaCommentLikeMapper {
  static toDomain(raw: PrismaCommentLike): CommentLike {
    return CommentLike.create(
      {
        authorId: new UniqueEntityID(raw.userId),
        commentId: new UniqueEntityID(raw.commentId),
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(
    commentLike: CommentLike,
  ): Prisma.CommentLikeUncheckedCreateInput {
    return {
      id: commentLike.id.toString(),
      commentId: commentLike.commentId.toString(),
      userId: commentLike.authorId.toString(),
      createdAt: commentLike.createdAt,
    }
  }
}
