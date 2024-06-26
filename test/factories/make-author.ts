import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Author,
  type AuthorProps,
} from '@/domain/blog/enterprise/entities/author'

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
