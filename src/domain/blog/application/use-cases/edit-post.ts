import type { Post } from '@prisma/client'

import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import type { PostsRepository } from '../repositories/posts-repository'

export type EditPostUseCaseRequest = {
  postId: string
  title?: string
  content?: string
}

type EditPostUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    updatedPost: Post
  }
>

export class EditPostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({
    postId,
    ...props
  }: EditPostUseCaseRequest): Promise<EditPostUseCaseResponse> {
    const post = await this.postsRepository.findById(postId)

    if (!post) {
      return left(new ResourceNotFoundError())
    }

    const updatedPost = await this.postsRepository.update({
      ...post,
      ...props,
    })

    return right({ updatedPost })
  }
}
