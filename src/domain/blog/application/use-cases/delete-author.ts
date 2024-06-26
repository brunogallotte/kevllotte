import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import type { AuthorsRepository } from '../repositories/authors-repository'

export type DeleteAuthorUseCaseRequest = {
  authorId: string
}

type DeleteAuthorUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  Record<string, never>
>

export class DeleteAuthorUseCase {
  constructor(private authorsRepository: AuthorsRepository) {}

  async execute({
    authorId,
  }: DeleteAuthorUseCaseRequest): Promise<DeleteAuthorUseCaseResponse> {
    const author = await this.authorsRepository.findById(authorId)

    if (!author) {
      return left(new ResourceNotFoundError())
    }

    if (author.id.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.authorsRepository.delete(author)

    return right({})
  }
}
