import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Author,
  type AuthorProps,
} from '@/domain/blog/enterprise/entities/author'
import { PrismaAuthorMapper } from '@/infra/database/prisma/mappers/prisma-author-mapper'
import { prisma } from '@/lib/prisma'

export function makeAuthor(
  override: Partial<AuthorProps> = {},
  id?: UniqueEntityID,
) {
  const author = Author.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      bio: faker.lorem.words(10),
      avatarUrl: faker.internet.url(),
      linkedinUrl: faker.internet.url(),
      githubUrl: null,
      instagramUrl: faker.internet.url(),
      twitterUrl: faker.internet.url(),
      websiteUrl: faker.internet.url(),
      ...override,
    },
    id,
  )

  return author
}

export class AuthorFactory {
  async makePrismaAuthor(data: Partial<AuthorProps> = {}): Promise<Author> {
    const author = makeAuthor(data)

    await prisma.user.create({
      data: PrismaAuthorMapper.toPrisma(author),
    })

    return author
  }
}
