import { FetchPostTagsUseCase } from '@/domain/blog/application/use-cases/fetch-post-tags'

import { PrismaTagsRepository } from '../repositories/prisma-tags-repository'

export function makeFetchPostTagsUseCase() {
  const tagsRepository = new PrismaTagsRepository()

  const fetchPostTagsUseCase = new FetchPostTagsUseCase(tagsRepository)

  return fetchPostTagsUseCase
}
