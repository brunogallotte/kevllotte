import { RemoveSavedPostUseCase } from '@/domain/blog/application/use-cases/remove-saved-post'

import { PrismaSavedPostsRepository } from '../repositories/prisma-saved-posts-repository'

export function makeRemoveSavedPostUseCase() {
  const savedPostsRepository = new PrismaSavedPostsRepository()

  const removeSavedPostUseCase = new RemoveSavedPostUseCase(
    savedPostsRepository,
  )

  return removeSavedPostUseCase
}
