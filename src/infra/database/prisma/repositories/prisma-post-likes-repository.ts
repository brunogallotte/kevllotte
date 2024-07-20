import type { PostLikesRepository } from '@/domain/blog/application/repositories/post-likes-repository'
import type { PostLike } from '@/domain/blog/enterprise/entities/post-like'
import { prisma } from '@/lib/prisma'

import { PrismaPostLikeMapper } from '../mappers/prisma-post-like-mapper'

export class PrismaPostLikesRepository implements PostLikesRepository {
  async findByPostAndAuthorId(postId: string, authorId: string) {
    const postLike = await prisma.postLike.findFirst({
      where: {
        postId,
        userId: authorId,
      },
    })

    if (!postLike) {
      return null
    }

    return PrismaPostLikeMapper.toDomain(postLike)
  }

  async create(postLike: PostLike) {
    const data = PrismaPostLikeMapper.toPrisma(postLike)

    await prisma.postLike.create({
      data,
    })
  }

  async delete(postLike: PostLike) {
    const data = PrismaPostLikeMapper.toPrisma(postLike)

    await prisma.postLike.delete({
      where: {
        id: data.id,
      },
    })
  }
}
