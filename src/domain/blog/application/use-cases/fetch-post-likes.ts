import { Either, right } from '@/core/either'

import type { PostLike } from '../../enterprise/entities/post-like'
import type { PostLikesRepository } from '../repositories/post-likes-repository'

type FetchPostLikesUseCaseRequest = {
  postId: string
  page: number
}

type FetchPostLikesUseCaseResponse = Either<
  null,
  {
    postLikes: PostLike[]
  }
>

export class FetchPostLikesUseCase {
  constructor(private postLikesRepository: PostLikesRepository) {}

  async execute({
    postId,
    page,
  }: FetchPostLikesUseCaseRequest): Promise<FetchPostLikesUseCaseResponse> {
    const postLikes = await this.postLikesRepository.findManyByPostId(postId, {
      page,
    })

    return right({ postLikes })
  }
}
