import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import type { PostsRepository } from '../repositories/posts-repository'
import type { UsersRepository } from '../repositories/users-repository'

export type DeletePostUseCaseRequest = {
  userId: string
  postId: string
}

type DeletePostUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  Record<string, never>
>

export class DeletePostUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private postsRepository: PostsRepository,
  ) {}

  async execute({
    userId,
    postId,
  }: DeletePostUseCaseRequest): Promise<DeletePostUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const post = await this.postsRepository.findById(postId)

    if (!post) {
      return left(new ResourceNotFoundError())
    }

    if (post.userId !== userId) {
      return left(new NotAllowedError())
    }

    await this.postsRepository.delete(postId)

    return right({})
  }
}
