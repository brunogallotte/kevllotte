import type { AuthorsRepository } from '@/domain/blog/application/repositories/authors-repository'
import type { Author } from '@/domain/blog/enterprise/entities/author'
import { prisma } from '@/lib/prisma'

import { PrismaAuthorMapper } from '../mappers/prisma-author-mapper'

export class PrismaAuthorsRepository implements AuthorsRepository {
  async findById(id: string) {
    const author = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!author) {
      return null
    }

    return PrismaAuthorMapper.toDomain(author)
  }

  async findByEmail(email: string) {
    const author = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!author) {
      return null
    }

    return PrismaAuthorMapper.toDomain(author)
  }

  async create(author: Author) {
    const data = PrismaAuthorMapper.toPrisma(author)

    await prisma.user.create({
      data,
    })
  }

  async delete(author: Author) {
    const data = PrismaAuthorMapper.toPrisma(author)

    await prisma.user.delete({
      where: {
        id: data.id,
      },
    })
  }
}
