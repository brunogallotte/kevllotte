import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import type { PostComment } from '../../enterprise/entities/post-comment'
import type { PostCommentsRepository } from '../repositories/post-comments-repository'

type EditCommentUseCaseRequest = {
  commentId: string
  authorId: string
  content: string
}

type EditCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    comment: PostComment
  }
>

export class EditCommentUseCase {
  constructor(private postCommentsRepository: PostCommentsRepository) {}

  async execute({
    commentId,
    authorId,
    content,
  }: EditCommentUseCaseRequest): Promise<EditCommentUseCaseResponse> {
    const comment = await this.postCommentsRepository.findById(commentId)

    if (!comment) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== comment.authorId.toString()) {
      return left(new NotAllowedError())
    }

    comment.content = content

    await this.postCommentsRepository.save(comment)

    return right({ comment })
  }
}
