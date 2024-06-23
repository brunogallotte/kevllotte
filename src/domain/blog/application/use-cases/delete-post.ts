import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { PostsRepository } from '../repositories/posts-repository'

type DeletePostUseCaseRequest = {
  authorId: string
  postId: string
}

type DeletePostUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  Record<string, never>
>

export class DeletePostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({
    authorId,
    postId,
  }: DeletePostUseCaseRequest): Promise<DeletePostUseCaseResponse> {
    const post = await this.postsRepository.findById(postId)

    if (!post) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== post.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.postsRepository.delete(post)

    return right({})
  }
}
