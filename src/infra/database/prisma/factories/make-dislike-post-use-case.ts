import { DislikePostUseCase } from '@/domain/blog/application/use-cases/dislike-post'

import { PrismaPostLikesRepository } from '../repositories/prisma-post-likes-repository'

export function makeDislikePostUseCase() {
  const postLikesRepository = new PrismaPostLikesRepository()

  const dislikePostUseCase = new DislikePostUseCase(postLikesRepository)

  return dislikePostUseCase
}
