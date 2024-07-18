import type {
  CommentLike as PrismaCommentLike,
  PostComment as PrismaPostComment,
  Prisma,
} from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CommentLike } from '@/domain/blog/enterprise/entities/comment-like'
import { PostComment } from '@/domain/blog/enterprise/entities/post-comment'

type PrismaPostCommentWithLikes = PrismaPostComment & {
  likes: PrismaCommentLike[]
}

export class PrismaPostCommentMapper {
  static toDomain(raw: PrismaPostCommentWithLikes): PostComment {
    return PostComment.create(
      {
        authorId: new UniqueEntityID(raw.userId),
        postId: new UniqueEntityID(raw.postId),
        content: raw.content,
        likes: raw.likes.map((like) =>
          CommentLike.create({
            authorId: new UniqueEntityID(like.userId),
            commentId: new UniqueEntityID(like.commentId),
            createdAt: like.createdAt,
          }),
        ),
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
