import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import type { Author } from '../../enterprise/entities/author'
import type { AuthorsRepository } from '../repositories/authors-repository'

export type EditAuthorProfileUseCaseRequest = {
  authorId: string
  name?: string
  bio?: string
  avatarUrl?: string
  linkedinUrl?: string
  githubUrl?: string
  instagramUrl?: string
  twitterUrl?: string
  websiteUrl?: string
}

type EditAuthorProfileUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    author: Author
  }
>

export class EditAuthorProfileUseCase {
  constructor(private authorsRepository: AuthorsRepository) {}

  async execute({
    authorId,
    name,
    bio,
    avatarUrl,
    linkedinUrl,
    githubUrl,
    instagramUrl,
    twitterUrl,
    websiteUrl,
  }: EditAuthorProfileUseCaseRequest): Promise<EditAuthorProfileUseCaseResponse> {
    const author = await this.authorsRepository.findById(authorId)

    if (!author) {
      return left(new ResourceNotFoundError())
    }

    if (author.id.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    author.name = name ?? author.name
    author.bio = bio ?? author.bio
    author.avatarUrl = avatarUrl ?? author.avatarUrl
    author.linkedinUrl = linkedinUrl ?? author.linkedinUrl
    author.githubUrl = githubUrl ?? author.githubUrl
    author.instagramUrl = instagramUrl ?? author.instagramUrl
    author.twitterUrl = twitterUrl ?? author.twitterUrl
    author.websiteUrl = websiteUrl ?? author.websiteUrl

    return right({ author })
  }
}
