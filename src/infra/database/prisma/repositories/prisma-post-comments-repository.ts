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
      include: {
        likes: true,
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
      include: {
        likes: true,
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

  async save(postComment: PostComment) {
    await prisma.postComment.update({
      where: {
        id: postComment.id.toString(),
      },
      data: {
        content: postComment.content,
        likes: {
          deleteMany: {},
          createMany: {
            data: postComment.likes.map((like) => ({
              userId: like.authorId.toString(),
            })),
          },
        },
      },
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
