import type { Prisma, User } from '@prisma/client'
import { hash } from 'bcryptjs'

import { Either, left, right } from '@/core/either'

import type { UsersRepository } from '../repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

export type RegisterUseCaseRequest = Prisma.UserCreateInput

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

    console.log(userWithSameEmail)

    if (userWithSameEmail) {
      console.log(left(new UserAlreadyExistsError()).value)
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
