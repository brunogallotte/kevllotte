import type { Post, Prisma } from '@prisma/client'

import type { PaginationParams } from '@/core/repositories/pagination-params'
import { prisma } from '@/lib/prisma'

import type { PostsRepository } from '../posts-repository'

export class PrismaPostsRepository implements PostsRepository {
  async findById(id: string) {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    })

    return post
  }

  async findManyByUserId(userId: string, { page }: PaginationParams) {
    const posts = await prisma.post.findMany({
      where: {
        userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return posts
  }

  async create(data: Prisma.PostUncheckedCreateInput) {
    const post = await prisma.post.create({
      data,
    })

    return post
  }

  async update(data: Post) {
    const post = await prisma.post.update({
      where: { id: data.id },

      data,
    })

    return post
  }
}
