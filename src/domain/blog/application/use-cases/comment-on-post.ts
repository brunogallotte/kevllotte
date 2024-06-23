import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { PostComment } from '../../enterprise/entities/post-comment'
import type { PostCommentsRepository } from '../repositories/post-comments-repository'
import { PostsRepository } from '../repositories/posts-repository'

type CommentOnPostUseCaseRequest = {
  authorId: string
  postId: string
  content: string
}

type CommentOnPostUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    postComment: PostComment
  }
>

export class CommentOnPostUseCase {
  constructor(
    private postsRepository: PostsRepository,
    private postCommentsRepository: PostCommentsRepository,
  ) {}

  async execute({
    authorId,
    postId,
    content,
  }: CommentOnPostUseCaseRequest): Promise<CommentOnPostUseCaseResponse> {
    const post = await this.postsRepository.findById(postId)

    if (!post) {
      return left(new ResourceNotFoundError())
    }

    const postComment = PostComment.create({
      authorId: new UniqueEntityID(authorId),
      postId: new UniqueEntityID(postId),
      content,
    })

    await this.postCommentsRepository.create(postComment)

    return right({ postComment })
  }
}
