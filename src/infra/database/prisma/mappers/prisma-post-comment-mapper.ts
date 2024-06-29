import type { PostComment as PrismaPostComment, Prisma } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PostComment } from '@/domain/blog/enterprise/entities/post-comment'

export class PrismaPostCommentMapper {
  static toDomain(raw: PrismaPostComment): PostComment {
    return PostComment.create(
      {
        authorId: new UniqueEntityID(raw.userId),
        postId: new UniqueEntityID(raw.postId),
        content: raw.content,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(
    postComment: PostComment,
  ): Prisma.PostCommentUncheckedCreateInput {
    return {
      id: postComment.id.toString(),
      postId: postComment.postId.toString(),
      userId: postComment.authorId.toString(),
      content: postComment.content,
      createdAt: postComment.createdAt,
      updatedAt: postComment.updatedAt,
    }
  }
}
