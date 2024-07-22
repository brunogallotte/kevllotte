import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import type { FollowsRepository } from '../repositories/follows-repository'

export type UnfollowAuthorUseCaseRequest = {
  followId: string
  followerAuthorId: string
}

type UnfollowAuthorUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  Record<string, never>
>

export class UnfollowAuthorUseCase {
  constructor(private followsRepository: FollowsRepository) {}

  async execute({
    followId,
    followerAuthorId,
  }: UnfollowAuthorUseCaseRequest): Promise<UnfollowAuthorUseCaseResponse> {
    const follow = await this.followsRepository.findById(followId)

    if (!follow) {
      return left(new ResourceNotFoundError())
    }

    if (follow.followerAuthorId.toString() !== followerAuthorId) {
      return left(new NotAllowedError())
    }

    await this.followsRepository.delete(follow)

    return right({})
  }
}
