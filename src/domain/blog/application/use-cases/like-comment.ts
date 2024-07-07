import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { CommentLike } from '../../enterprise/entities/comment-like'
import type { CommentLikesRepository } from '../repositories/comment-likes-repository'
import type { PostCommentsRepository } from '../repositories/post-comments-repository'

type LikeCommentUseCaseRequest = {
  authorId: string
  commentId: string
}

type LikeCommentUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    commentLike: CommentLike
  }
>

export class LikeCommentUseCase {
  constructor(
    private postCommentsRepository: PostCommentsRepository,
    private commentLikesRepository: CommentLikesRepository,
  ) {}

  async execute({
    authorId,
    commentId,
  }: LikeCommentUseCaseRequest): Promise<LikeCommentUseCaseResponse> {
    const comment = await this.postCommentsRepository.findById(commentId)

    if (!comment) {
      return left(new ResourceNotFoundError())
    }

    const commentLike = CommentLike.create({
      authorId: new UniqueEntityID(authorId),
      commentId: new UniqueEntityID(commentId),
    })

    await this.commentLikesRepository.create(commentLike)

    return right({ commentLike })
  }
}
