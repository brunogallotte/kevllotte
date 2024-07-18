import { FetchSavedPostsUseCase } from '@/domain/blog/application/use-cases/fetch-saved-posts'

import { PrismaSavedPostsRepository } from '../repositories/prisma-saved-posts-repository'

export function makeFetchSavedPostsUseCase() {
  const savedPostsRepository = new PrismaSavedPostsRepository()

  const fetchSavedPostsUseCase = new FetchSavedPostsUseCase(
    savedPostsRepository,
  )

  return fetchSavedPostsUseCase
}
