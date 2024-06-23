import { EditPostUseCase } from '../../../../domain/blog/application/use-cases/edit-post'
import { PrismaPostsRepository } from '../repositories/prisma-posts-repository'

export function makeEditPostUseCase() {
  const postsRepository = new PrismaPostsRepository()

  const editPostUseCase = new EditPostUseCase(postsRepository)

  return editPostUseCase
}
