import type { Prisma, User } from '@prisma/client'
import { randomUUID } from 'crypto'

import type { UsersRepository } from '@/domain/blog/application/repositories/users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string) {
    const user = this.items.find((user) => user.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async delete(id: string) {
    this.items = this.items.filter((item) => item.id !== id)
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
      bio: null,
      avatarUrl: null,
      githubUrl: null,
      instagramUrl: null,
      linkedinUrl: null,
      twitterUrl: null,
      websiteUrl: null,
    }

    this.items.push(user)

    return user
  }

  async update(data: User) {
    const userToUpdateIndex = this.items.findIndex(
      (item) => item.id === data.id,
    )

    const updatedUser = {
      ...data,
    }

    this.items.splice(userToUpdateIndex, 1, updatedUser)

    return updatedUser
  }
}
