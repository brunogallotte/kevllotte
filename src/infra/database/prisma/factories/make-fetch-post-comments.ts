import { FetchPostCommentsUseCase } from '@/domain/blog/application/use-cases/fetch-post-comments'

import { PrismaPostCommentsRepository } from '../repositories/prisma-post-comments-repository'

export function makeFetchPostCommentsUseCase() {
  const postCommentsRepository = new PrismaPostCommentsRepository()

  const fetchAuthorPostsUseCase = new FetchPostCommentsUseCase(
    postCommentsRepository,
  )

  return fetchAuthorPostsUseCase
}
