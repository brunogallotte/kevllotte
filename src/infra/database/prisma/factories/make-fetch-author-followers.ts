import { FetchAuthorFollowersUseCase } from '@/domain/blog/application/use-cases/fetch-author-followers'

import { PrismaFollowsRepository } from '../repositories/prisma-follows-repository'

export function makeFetchAuthorFollowersUseCase() {
  const followsRepository = new PrismaFollowsRepository()

  const fetchAuthorFollowersUseCase = new FetchAuthorFollowersUseCase(
    followsRepository,
  )

  return fetchAuthorFollowersUseCase
}
