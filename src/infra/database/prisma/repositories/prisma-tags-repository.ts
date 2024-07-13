import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { TagsRepository } from '@/domain/blog/application/repositories/tags-repository'
import type { Tag } from '@/domain/blog/enterprise/entities/tag'
import { prisma } from '@/lib/prisma'

import { PrismaPostTagMapper } from '../mappers/prisma-post-tag-mapper'

export class PrismaTagsRepository implements TagsRepository {
  async findById(id: string) {
    const tag = await prisma.tag.findUnique({
      where: {
        id,
      },
    })

    if (!tag) {
      return null
    }

    return PrismaPostTagMapper.toDomain(tag)
  }

  async findManyByPostId(postId: string, { page }: PaginationParams) {
    const tags = await prisma.tag.findMany({
      where: {
        postId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return tags.map((tag) => PrismaPostTagMapper.toDomain(tag))
  }

  async delete(tag: Tag) {
    await prisma.tag.delete({
      where: {
        id: tag.id.toString(),
      },
    })
  }

  async create(tag: Tag) {
    const data = PrismaPostTagMapper.toPrisma(tag)

    await prisma.tag.create({
      data,
    })
  }
}
