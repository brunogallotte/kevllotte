import type { User } from '@prisma/client'
import { compare } from 'bcryptjs'

import { Either, left, right } from '@/core/either'

import type { UsersRepository } from '../repositories/users-repository'
import { UserNotFound } from './errors/user-not-found'

type AuthenticateUseCaseRequest = {
  email: string
  password: string
}

type AuthenticateUseCaseResponse = Either<
  UserNotFound,
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
      return left(new UserNotFound())
    }

    const passwordMatch = await compare(password, hasUser.password)

    if (!passwordMatch) {
      return left(new UserNotFound())
    }

    return right({ user: hasUser })
  }
}
