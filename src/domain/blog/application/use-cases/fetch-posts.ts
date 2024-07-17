import { Either, right } from '@/core/either'

import type { Post } from '../../enterprise/entities/post'
import type { PostsRepository } from '../repositories/posts-repository'

type FetchPostsUseCaseRequest = {
  page: number
}

type FetchPostsUseCaseResponse = Either<
  null,
  {
    posts: Post[]
  }
>

export class FetchPostsUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({
    page,
  }: FetchPostsUseCaseRequest): Promise<FetchPostsUseCaseResponse> {
    const posts = await this.postsRepository.findMany({
      page,
    })

    return right({ posts })
  }
}
