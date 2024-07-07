import { LikePostUseCase } from '@/domain/blog/application/use-cases/like-post'

import { PrismaPostLikesRepository } from '../repositories/prisma-post-likes-repository'
import { PrismaPostsRepository } from '../repositories/prisma-posts-repository'

export function makeLikePostUseCase() {
  const postsRepository = new PrismaPostsRepository()
  const postLikesRepository = new PrismaPostLikesRepository()

  const likePostUseCase = new LikePostUseCase(
    postsRepository,
    postLikesRepository,
  )

  return likePostUseCase
}
