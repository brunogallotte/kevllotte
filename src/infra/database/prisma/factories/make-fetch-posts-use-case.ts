import { FetchPostsUseCase } from '@/domain/blog/application/use-cases/fetch-posts'

import { PrismaPostsRepository } from '../repositories/prisma-posts-repository'

export function makeFetchPostsUseCase() {
  const postsRepository = new PrismaPostsRepository()

  const fetchPostsUseCase = new FetchPostsUseCase(postsRepository)

  return fetchPostsUseCase
}
