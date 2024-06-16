import type { Post, Prisma } from '@prisma/client'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import type { PostsRepository } from '../repositories/posts-repository'
import type { UsersRepository } from '../repositories/users-repository'

export type CreatePostUseCaseRequest = Prisma.PostUncheckedCreateInput

type CreatePostUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    post: Post
  }
>

export class CreatePostUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private postsRepository: PostsRepository,
  ) {}

  async execute({
    title,
    content,
    userId,
    status,
    collabId,
  }: CreatePostUseCaseRequest): Promise<CreatePostUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const post = await this.postsRepository.create({
      title,
      content,
      userId,
      status,
      collabId,
    })

    return right({ post })
  }
}
