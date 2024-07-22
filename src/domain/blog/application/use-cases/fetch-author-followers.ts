import { Either, right } from '@/core/either'

import type { Follow } from '../../enterprise/entities/follow'
import type { FollowsRepository } from '../repositories/follows-repository'

type FetchAuthorFollowersUseCaseRequest = {
  authorId: string
  page: number
}

type FetchAuthorFollowersUseCaseResponse = Either<
  null,
  {
    followers: Follow[]
  }
>

export class FetchAuthorFollowersUseCase {
  constructor(private followsRepository: FollowsRepository) {}

  async execute({
    authorId,
    page,
  }: FetchAuthorFollowersUseCaseRequest): Promise<FetchAuthorFollowersUseCaseResponse> {
    const followers = await this.followsRepository.findManyFollowersByAuthorId(
      authorId,
      {
        page,
      },
    )

    return right({ followers })
  }
}
