import type { User } from '@prisma/client'
import { hash } from 'bcryptjs'

import { Either, left, right } from '@/core/either'
import type { Optional } from '@/core/types/optional'

import type { UsersRepository } from '../repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

export type RegisterUseCaseRequest = Optional<
  User,
  | 'bio'
  | 'avatarUrl'
  | 'githubUrl'
  | 'twitterUrl'
  | 'websiteUrl'
  | 'linkedinUrl'
  | 'instagramUrl'
  | 'createdAt'
  | 'updatedAt'
>

type RegisterUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    user: User
  }
>

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const passwordHash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      return left(new UserAlreadyExistsError())
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    })

    return right({ user })
  }
}
