import { Either, right } from '@/core/either'

import type { Post } from '../../enterprise/entities/post'
import type { PostsRepository } from '../repositories/posts-repository'

type FetchAuthorPostsUseCaseRequest = {
  authorId: string
  page: number
}

type FetchAuthorPostsUseCaseResponse = Either<
  null,
  {
    posts: Post[]
  }
>

export class FetchAuthorPostsUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({
    authorId,
    page,
  }: FetchAuthorPostsUseCaseRequest): Promise<FetchAuthorPostsUseCaseResponse> {
    const posts = await this.postsRepository.findManyByAuthorId(authorId, {
      page,
    })

    return right({ posts })
  }
}
