import { CreatePostUseCase } from '../../../../domain/blog/application/use-cases/create-post'
import { PrismaPostsRepository } from '../repositories/prisma-posts-repository'

export function makeCreatePostUseCase() {
  const postsRepository = new PrismaPostsRepository()

  const createPostUseCase = new CreatePostUseCase(postsRepository)

  return createPostUseCase
}
