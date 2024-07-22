import { UnfollowAuthorUseCase } from '@/domain/blog/application/use-cases/unfollow-author'

import { PrismaFollowsRepository } from '../repositories/prisma-follows-repository'

export function makeUnfollowAuthorUseCase() {
  const followsRepository = new PrismaFollowsRepository()

  const unfollowAuthorUseCase = new UnfollowAuthorUseCase(followsRepository)

  return unfollowAuthorUseCase
}
