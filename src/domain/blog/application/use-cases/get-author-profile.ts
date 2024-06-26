import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import type { Author } from '../../enterprise/entities/author'
import type { AuthorsRepository } from '../repositories/authors-repository'

export type GetAuthorProfileUseCaseRequest = {
  authorId: string
}

type GetAuthorProfileUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    author: Author
  }
>

export class GetAuthorProfileUseCase {
  constructor(private authorsRepository: AuthorsRepository) {}

  async execute({
    authorId,
  }: GetAuthorProfileUseCaseRequest): Promise<GetAuthorProfileUseCaseResponse> {
    const author = await this.authorsRepository.findById(authorId)

    if (!author) {
      return left(new ResourceNotFoundError())
    }

    return right({ author })
  }
}
