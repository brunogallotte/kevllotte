import { FetchAuthorPostsUseCase } from '@/domain/blog/application/use-cases/fetch-author-posts'

import { PrismaPostsRepository } from '../repositories/prisma-posts-repository'

export function makeFetchAuthorPostsUseCase() {
  const postsRepository = new PrismaPostsRepository()

  const fetchAuthorPostsUseCase = new FetchAuthorPostsUseCase(postsRepository)

  return fetchAuthorPostsUseCase
}
