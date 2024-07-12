import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import type { CommentLikesRepository } from '../repositories/comment-likes-repository'

type DislikeCommentUseCaseRequest = {
  authorId: string
  likeId: string
}

type DislikeCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  Record<string, never>
>

export class DislikeCommentUseCase {
  constructor(private commentLikesRepository: CommentLikesRepository) {}

  async execute({
    authorId,
    likeId,
  }: DislikeCommentUseCaseRequest): Promise<DislikeCommentUseCaseResponse> {
    const commentLike = await this.commentLikesRepository.findById(likeId)

    if (!commentLike) {
      return left(new ResourceNotFoundError())
    }

    if (commentLike.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.commentLikesRepository.delete(commentLike)

    return right({})
  }
}
