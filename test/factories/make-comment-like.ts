import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  CommentLike,
  type CommentLikeProps,
} from '@/domain/blog/enterprise/entities/comment-like'
import { PrismaCommentLikeMapper } from '@/infra/database/prisma/mappers/prisma-comment-like-mapper'
import { prisma } from '@/lib/prisma'

export function makeCommentLike(
  override: Partial<CommentLikeProps> = {},
  id?: UniqueEntityID,
) {
  const commentLike = CommentLike.create(
    {
      authorId: new UniqueEntityID(),
      commentId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return commentLike
}

export class CommentLikeFactory {
  async makePrismaCommentLike(
    data: Partial<CommentLikeProps> = {},
  ): Promise<CommentLike> {
    const commentLike = makeCommentLike(data)

    await prisma.commentLike.create({
      data: PrismaCommentLikeMapper.toPrisma(commentLike),
    })

    return commentLike
  }
}
