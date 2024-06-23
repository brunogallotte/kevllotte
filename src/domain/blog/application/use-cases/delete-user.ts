import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import type { UsersRepository } from '../repositories/users-repository'

export type DeleteUserUseCaseRequest = {
  userId: string
}

type DeleteUserUseCaseResponse = Either<
  ResourceNotFoundError,
  Record<string, never>
>

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    await this.usersRepository.delete(userId)

    return right({})
  }
}
