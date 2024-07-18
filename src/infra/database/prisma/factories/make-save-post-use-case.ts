import { SavePostUseCase } from '@/domain/blog/application/use-cases/save-post'

import { PrismaPostsRepository } from '../repositories/prisma-posts-repository'
import { PrismaSavedPostsRepository } from '../repositories/prisma-saved-posts-repository'

export function makeSavePostUseCase() {
  const postsRepository = new PrismaPostsRepository()
  const savedPostsRepository = new PrismaSavedPostsRepository()

  const savePostUseCase = new SavePostUseCase(
    postsRepository,
    savedPostsRepository,
  )

  return savePostUseCase
}
