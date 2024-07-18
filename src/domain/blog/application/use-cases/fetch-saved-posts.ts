import { Either, right } from '@/core/either'

import type { Post } from '../../enterprise/entities/post'
import type { SavedPostsRepository } from '../repositories/saved-posts-repository'

type FetchSavedPostsUseCaseRequest = {
  authorId: string
  page: number
}

type FetchSavedPostsUseCaseResponse = Either<
  null,
  {
    savedPosts: Post[]
  }
>

export class FetchSavedPostsUseCase {
  constructor(private savedPostsRepository: SavedPostsRepository) {}

  async execute({
    authorId,
    page,
  }: FetchSavedPostsUseCaseRequest): Promise<FetchSavedPostsUseCaseResponse> {
    const savedPosts = await this.savedPostsRepository.findManyByAuthorId(
      authorId,
      {
        page,
      },
    )

    return right({ savedPosts })
  }
}
