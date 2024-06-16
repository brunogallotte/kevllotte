import { Prisma, User } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        bio: data.bio,
        password: data.password,
        avatarUrl: data.avatarUrl,
        githubUrl: data.githubUrl,
        linkedinUrl: data.linkedinUrl,
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

  async update(data: User) {
    const user = await prisma.user.update({
      where: { id: data.id },
      data,
    })

    return user
  }
}
