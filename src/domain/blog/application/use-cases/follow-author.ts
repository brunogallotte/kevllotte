import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { Follow } from '../../enterprise/entities/follow'
import type { FollowsRepository } from '../repositories/follows-repository'

export type FollowAuthorUseCaseRequest = {
  followerAuthorId: string
  followingAuthorId: string
}

type FollowAuthorUseCaseResponse = Either<
  null,
  {
    follow: Follow
  }
>

export class FollowAuthorUseCase {
  constructor(private followsRepository: FollowsRepository) {}

  async execute({
    followerAuthorId,
    followingAuthorId,
  }: FollowAuthorUseCaseRequest): Promise<FollowAuthorUseCaseResponse> {
    const follow = Follow.create({
      followerAuthorId: new UniqueEntityID(followerAuthorId),
      followingAuthorId: new UniqueEntityID(followingAuthorId),
    })

    await this.followsRepository.create(follow)

    return right({ follow })
  }
}
