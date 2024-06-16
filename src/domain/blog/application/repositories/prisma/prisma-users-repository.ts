import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        bio: data.bio,
        passwordHash: data.passwordHash,
        avatarUrl: data.avatarUrl,
        githubUrl: data.githubUrl,
        instagramUrl: data.instagramUrl,
        twitterUrl: data.twitterUrl,
        websiteUrl: data.websiteUrl,
      },
    })

    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({ where: { id } })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } })

    return user
  }
}
