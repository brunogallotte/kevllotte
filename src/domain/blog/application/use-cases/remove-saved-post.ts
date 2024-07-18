import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import type { SavedPostsRepository } from '../repositories/saved-posts-repository'

export type RemoveSavedPostUseCaseRequest = {
  savedPostId: string
}

type RemoveSavedPostUseCaseResponse = Either<
  ResourceNotFoundError,
  Record<string, never>
>

export class RemoveSavedPostUseCase {
  constructor(private savedPostsRepository: SavedPostsRepository) {}

  async execute({
    savedPostId,
  }: RemoveSavedPostUseCaseRequest): Promise<RemoveSavedPostUseCaseResponse> {
    const savedPost = await this.savedPostsRepository.findByPostId(savedPostId)

    if (!savedPost) {
      return left(new ResourceNotFoundError())
    }

    await this.savedPostsRepository.delete(savedPost)

    return right({})
  }
}
