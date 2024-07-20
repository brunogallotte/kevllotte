import type { Prisma, User as PrismaAuthor } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Author } from '@/domain/blog/enterprise/entities/author'

export class PrismaAuthorMapper {
  static toDomain(raw: PrismaAuthor): Author {
    return Author.create(
      {
        email: raw.email,
        name: raw.name,
        username: raw.username,
        password: raw.password,
        bio: raw.bio,
        avatarUrl: raw.avatarUrl,
        linkedinUrl: raw.linkedinUrl,
        githubUrl: raw.githubUrl,
        instagramUrl: raw.instagramUrl,
        twitterUrl: raw.twitterUrl,
        websiteUrl: raw.websiteUrl,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(author: Author): Prisma.UserUncheckedCreateInput {
    return {
      id: author.id.toString(),
      name: author.name,
      username: author.username,
      email: author.email,
      password: author.password,
      bio: author.bio,
      avatarUrl: author.avatarUrl,
      linkedinUrl: author.linkedinUrl,
      githubUrl: author.githubUrl,
      instagramUrl: author.instagramUrl,
      twitterUrl: author.twitterUrl,
      websiteUrl: author.websiteUrl,
      createdAt: author.createdAt,
      updatedAt: author.updatedAt,
    }
  }
}
