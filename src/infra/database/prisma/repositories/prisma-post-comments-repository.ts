import type { PostCommentsRepository } from '@/domain/blog/application/repositories/post-comments-repository'
import type { PostComment } from '@/domain/blog/enterprise/entities/post-comment'
import { prisma } from '@/lib/prisma'

import { PrismaPostCommentMapper } from '../mappers/prisma-post-comment-mapper'

export class PrismaPostCommentsRepository implements PostCommentsRepository {
  async findById(id: string) {
    const postComment = await prisma.postComment.findUnique({
      where: {
        id,
      },
    })

    if (!postComment) {
      return null
    }

    return PrismaPostCommentMapper.toDomain(postComment)
  }

  async findManyByPostId(postId: string) {
    const postComments = await prisma.postComment.findMany({
      where: {
        postId,
      },
    })

    return postComments.map((postComment) =>
      PrismaPostCommentMapper.toDomain(postComment),
    )
  }

  async create(postComment: PostComment) {
    const data = PrismaPostCommentMapper.toPrisma(postComment)

    await prisma.postComment.create({
      data,
    })
  }

  async delete(postComment: PostComment) {
    const data = PrismaPostCommentMapper.toPrisma(postComment)

    await prisma.postComment.delete({
      where: {
        id: data.id,
      },
    })
  }
}
