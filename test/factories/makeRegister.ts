import { faker } from '@faker-js/faker'
import type { User } from '@prisma/client'
import { randomUUID } from 'crypto'

export function makeRegister(override?: Partial<User>) {
  const user: User = {
    id: randomUUID(),
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 6 }),
    avatarUrl: null,
    bio: null,
    githubUrl: null,
    instagramUrl: null,
    linkedinUrl: null,
    twitterUrl: null,
    websiteUrl: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...override,
  }

  return user
}
