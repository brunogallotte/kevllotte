import { Either, right } from '@/core/either'

import type { PostComment } from '../../enterprise/entities/post-comment'
import type { PostCommentsRepository } from '../repositories/post-comments-repository'

type FetchPostCommentsUseCaseRequest = {
  postId: string
  page: number
}

type FetchPostCommentsUseCaseResponse = Either<
  null,
  {
    postComments: PostComment[]
  }
>

export class FetchPostCommentsUseCase {
  constructor(private postCommentsRepository: PostCommentsRepository) {}

  async execute({
    postId,
    page,
  }: FetchPostCommentsUseCaseRequest): Promise<FetchPostCommentsUseCaseResponse> {
    const postComments = await this.postCommentsRepository.findManyByPostId(
      postId,
      { page },
    )

    return right({ postComments })
  }
}
