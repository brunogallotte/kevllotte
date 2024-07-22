import { FetchPostLikesUseCase } from '@/domain/blog/application/use-cases/fetch-post-likes'

import { PrismaPostLikesRepository } from '../repositories/prisma-post-likes-repository'

export function makeFetchPostLikesUseCase() {
  const postLikesRepository = new PrismaPostLikesRepository()

  const fetchAuthorPostLikesUseCase = new FetchPostLikesUseCase(
    postLikesRepository,
  )

  return fetchAuthorPostLikesUseCase
}
