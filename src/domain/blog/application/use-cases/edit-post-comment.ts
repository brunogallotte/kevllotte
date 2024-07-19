import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import type { PostComment } from '../../enterprise/entities/post-comment'
import type { PostCommentsRepository } from '../repositories/post-comments-repository'

type EditPostCommentUseCaseRequest = {
  commentId: string
  authorId: string
  content: string
}

type EditPostCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    postComment: PostComment
  }
>

export class EditPostCommentUseCase {
  constructor(private postCommentsRepository: PostCommentsRepository) {}

  async execute({
    commentId,
    authorId,
    content,
  }: EditPostCommentUseCaseRequest): Promise<EditPostCommentUseCaseResponse> {
    const postComment = await this.postCommentsRepository.findById(commentId)

    if (!postComment) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== postComment.authorId.toString()) {
      return left(new NotAllowedError())
    }

    postComment.content = content

    await this.postCommentsRepository.save(postComment)

    return right({ postComment })
  }
}
