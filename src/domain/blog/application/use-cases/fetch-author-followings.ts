import { Either, right } from '@/core/either'

import type { Follow } from '../../enterprise/entities/follow'
import type { FollowsRepository } from '../repositories/follows-repository'

type FetchAuthorFollowingsUseCaseRequest = {
  authorId: string
  page: number
}

type FetchAuthorFollowingsUseCaseResponse = Either<
  null,
  {
    followings: Follow[]
  }
>

export class FetchAuthorFollowingsUseCase {
  constructor(private followsRepository: FollowsRepository) {}

  async execute({
    authorId,
    page,
  }: FetchAuthorFollowingsUseCaseRequest): Promise<FetchAuthorFollowingsUseCaseResponse> {
    const followings =
      await this.followsRepository.findManyFollowingsByAuthorId(authorId, {
        page,
      })

    return right({ followings })
  }
}
