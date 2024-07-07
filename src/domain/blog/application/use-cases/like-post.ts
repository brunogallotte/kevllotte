import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { PostLike } from '../../enterprise/entities/post-like'
import type { PostLikesRepository } from '../repositories/post-likes-repository'
import { PostsRepository } from '../repositories/posts-repository'

type LikePostUseCaseRequest = {
  authorId: string
  postId: string
}

type LikePostUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    postLike: PostLike
  }
>

export class LikePostUseCase {
  constructor(
    private postsRepository: PostsRepository,
    private postLikesRepository: PostLikesRepository,
  ) {}

  async execute({
    authorId,
    postId,
  }: LikePostUseCaseRequest): Promise<LikePostUseCaseResponse> {
    const post = await this.postsRepository.findById(postId)

    if (!post) {
      return left(new ResourceNotFoundError())
    }

    const postLike = PostLike.create({
      authorId: new UniqueEntityID(authorId),
      postId: new UniqueEntityID(postId),
    })

    await this.postLikesRepository.create(postLike)

    return right({ postLike })
  }
}
