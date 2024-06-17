import { PrismaPostsRepository } from '../../repositories/prisma/prisma-posts-repository'
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { CreatePostUseCase } from '../create-post'

export function makeCreatePostUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const postsRepository = new PrismaPostsRepository()
  const createPostUseCase = new CreatePostUseCase(
    usersRepository,
    postsRepository,
  )

  return createPostUseCase
}
