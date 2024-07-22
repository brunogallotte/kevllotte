import { FetchAuthorFollowingsUseCase } from '@/domain/blog/application/use-cases/fetch-author-followings'

import { PrismaFollowsRepository } from '../repositories/prisma-follows-repository'

export function makeFetchAuthorFollowingsUseCase() {
  const followsRepository = new PrismaFollowsRepository()

  const fetchAuthorFollowersUseCase = new FetchAuthorFollowingsUseCase(
    followsRepository,
  )

  return fetchAuthorFollowersUseCase
}
