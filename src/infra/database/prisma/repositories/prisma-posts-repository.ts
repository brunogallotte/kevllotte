import type { PostStatus } from '@prisma/client'

import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { PostsRepository } from '@/domain/blog/application/repositories/posts-repository'
import { Post, POST_STATUS } from '@/domain/blog/enterprise/entities/post'
import { prisma } from '@/lib/prisma'

import { PrismaPostMapper } from '../mappers/prisma-post-mapper'

export class PrismaPostsRepository implements PostsRepository {
  async findById(id: string) {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    })

    if (!post) {
      return null
    }

    return PrismaPostMapper.toDomain(post)
  }

  async findManyByAuthorId(authorId: string, { page }: PaginationParams) {
    const posts = await prisma.post.findMany({
      where: {
        userId: authorId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return posts.map((post) => PrismaPostMapper.toDomain(post))
  }

  async findMany({ page }: PaginationParams) {
    const posts = await prisma.post.findMany({
      take: 20,
      skip: (page - 1) * 20,
    })

    return posts.map((post) => PrismaPostMapper.toDomain(post))
  }

  async delete(post: Post) {
    await prisma.post.delete({
      where: {
        id: post.id.toString(),
      },
    })
  }

  async create(post: Post) {
    const data = PrismaPostMapper.toPrisma(post)

    await prisma.post.create({
      data,
    })
  }

  async save(post: Post) {
    await prisma.post.update({
      where: {
        id: post.id.toString(),
      },
      data: {
        title: post.title,
        content: post.content,
        status: POST_STATUS[post.status] as PostStatus,
      },
    })
  }
}
