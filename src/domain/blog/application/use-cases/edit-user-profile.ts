import type { User } from '@prisma/client'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import type { UsersRepository } from '../repositories/users-repository'

export type EditUserProfileUseCaseRequest = {
  userId: string
  name?: string
  bio?: string
  avatarUrl?: string
  linkedinUrl?: string
  githubUrl?: string
  instagramUrl?: string
  twitterUrl?: string
  websiteUrl?: string
}

type EditUserProfileUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    updatedUser: User
  }
>

export class EditUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    ...props
  }: EditUserProfileUseCaseRequest): Promise<EditUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const updatedUser = await this.usersRepository.update({
      ...user,
      ...props,
    })

    return right({ updatedUser })
  }
}
