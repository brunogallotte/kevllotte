import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { SavedPostsRepository } from '@/domain/blog/application/repositories/saved-posts-repository'
import type { Post } from '@/domain/blog/enterprise/entities/post'
import { prisma } from '@/lib/prisma'

import { PrismaSavedPostMapper } from '../mappers/prisma-saved-post-mapper'

export class PrismaSavedPostsRepository implements SavedPostsRepository {
  async findByPostId(postId: string) {
    const savedPost = await prisma.savedPost.findUnique({
      where: {
        postId,
      },
      include: {
        post: {
          include: {
            likes: true,
          },
        },
      },
    })

    if (!savedPost) {
      return null
    }

    return PrismaSavedPostMapper.toDomain(savedPost.post)
  }

  async findManyByAuthorId(authorId: string, { page }: PaginationParams) {
    const savedPosts = await prisma.savedPost.findMany({
      where: {
        userId: authorId,
      },
      include: {
        post: {
          include: {
            likes: true,
          },
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return savedPosts.map((savedPost) =>
      PrismaSavedPostMapper.toDomain(savedPost.post),
    )
  }

  async delete(savedPost: Post) {
    await prisma.savedPost.delete({
      where: {
        postId: savedPost.id.toString(),
      },
    })
  }

  async create(savedPost: Post) {
    const data = PrismaSavedPostMapper.toPrisma(savedPost)

    await prisma.savedPost.create({
      data,
    })
  }
}
