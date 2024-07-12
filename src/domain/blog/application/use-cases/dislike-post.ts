import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import type { PostLikesRepository } from '../repositories/post-likes-repository'

type DislikePostUseCaseRequest = {
  authorId: string
  likeId: string
}

type DislikePostUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  Record<string, never>
>

export class DislikePostUseCase {
  constructor(private postLikesRepository: PostLikesRepository) {}

  async execute({
    authorId,
    likeId,
  }: DislikePostUseCaseRequest): Promise<DislikePostUseCaseResponse> {
    const postLike = await this.postLikesRepository.findById(likeId)

    if (!postLike) {
      return left(new ResourceNotFoundError())
    }

    if (postLike.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.postLikesRepository.delete(postLike)

    return right({})
  }
}
