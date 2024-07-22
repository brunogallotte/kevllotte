import { FollowAuthorUseCase } from '@/domain/blog/application/use-cases/follow-author'

import { PrismaFollowsRepository } from '../repositories/prisma-follows-repository'

export function makeFollowAuthorUseCase() {
  const followsRepository = new PrismaFollowsRepository()

  const followAuthorUseCase = new FollowAuthorUseCase(followsRepository)

  return followAuthorUseCase
}
