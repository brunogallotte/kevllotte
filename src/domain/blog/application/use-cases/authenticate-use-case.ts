import type { User } from '@prisma/client'
import { compare } from 'bcryptjs'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import type { UsersRepository } from '../repositories/users-repository'

type AuthenticateUseCaseRequest = {
  email: string
  password: string
}

type AuthenticateUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    user: User
  }
>

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const hasUser = await this.usersRepository.findByEmail(email)

    if (!hasUser) {
      return left(new ResourceNotFoundError())
    }

    const passwordMatch = await compare(password, hasUser.password)

    if (!passwordMatch) {
      return left(new ResourceNotFoundError())
    }

    return right({ user: hasUser })
  }
}
