import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import type { PostsRepository } from '../repositories/posts-repository'

export type DeletePostUseCaseRequest = {
  postId: string
}

type DeletePostUseCaseResponse = Either<ResourceNotFoundError, null>

export class DeletePostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({
    postId,
  }: DeletePostUseCaseRequest): Promise<DeletePostUseCaseResponse> {
    const post = await this.postsRepository.findById(postId)

    if (!post) {
      return left(new ResourceNotFoundError())
    }

    await this.postsRepository.delete(postId)

    return right(null)
  }
}
