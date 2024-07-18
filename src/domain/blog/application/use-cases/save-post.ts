import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import type { PostsRepository } from '../repositories/posts-repository'
import type { SavedPostsRepository } from '../repositories/saved-posts-repository'

export type SavePostUseCaseRequest = {
  postId: string
}

type SavePostUseCaseResponse = Either<
  ResourceNotFoundError,
  Record<string, never>
>

export class SavePostUseCase {
  constructor(
    private postsRepository: PostsRepository,
    private savedPostsRepository: SavedPostsRepository,
  ) {}

  async execute({
    postId,
  }: SavePostUseCaseRequest): Promise<SavePostUseCaseResponse> {
    const post = await this.postsRepository.findById(postId)

    if (!post) {
      return left(new ResourceNotFoundError())
    }

    await this.savedPostsRepository.create(post)

    return right({})
  }
}
