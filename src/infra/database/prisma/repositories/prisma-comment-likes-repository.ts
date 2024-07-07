import type { CommentLikesRepository } from '@/domain/blog/application/repositories/comment-likes-repository'
import type { CommentLike } from '@/domain/blog/enterprise/entities/comment-like'
import { prisma } from '@/lib/prisma'

import { PrismaCommentLikeMapper } from '../mappers/prisma-comment-like-mapper'

export class PrismaCommentLikesRepository implements CommentLikesRepository {
  async findById(id: string) {
    const commentLike = await prisma.commentLike.findUnique({
      where: {
        id,
      },
    })

    if (!commentLike) {
      return null
    }

    return PrismaCommentLikeMapper.toDomain(commentLike)
  }

  async findManyByCommentId(commentId: string) {
    const commentLikes = await prisma.commentLike.findMany({
      where: {
        commentId,
      },
    })

    return commentLikes.map((commentLike) =>
      PrismaCommentLikeMapper.toDomain(commentLike),
    )
  }

  async create(commentLike: CommentLike) {
    const data = PrismaCommentLikeMapper.toPrisma(commentLike)

    await prisma.commentLike.create({
      data,
    })
  }

  async delete(commentLike: CommentLike) {
    const data = PrismaCommentLikeMapper.toPrisma(commentLike)

    await prisma.commentLike.delete({
      where: {
        id: data.id,
      },
    })
  }
}
