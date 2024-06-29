import { DeletePostUseCase } from '@/domain/blog/application/use-cases/delete-post'

import { PrismaPostsRepository } from '../repositories/prisma-posts-repository'

export function makeDeletePostUseCase() {
  const postsRepository = new PrismaPostsRepository()

  const deletePostUseCase = new DeletePostUseCase(postsRepository)

  return deletePostUseCase
}
