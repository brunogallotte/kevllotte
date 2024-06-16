import type { Post } from '@prisma/client'

import { Either, right } from '@/core/either'

import type { PostsRepository } from '../repositories/posts-repository'

export type FetchUserPostsUseCaseRequest = {
  userId: string
  page: number
}

type FetchUserPostsUseCaseResponse = Either<
  null,
  {
    posts: Post[]
  }
>

export class FetchUserPostsUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserPostsUseCaseRequest): Promise<FetchUserPostsUseCaseResponse> {
    const posts = await this.postsRepository.findManyByUserId(userId, {
      page,
    })

    return right({ posts })
  }
}
