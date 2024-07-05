import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { PostComment } from '../../enterprise/entities/post-comment'
import type { PostCommentsRepository } from '../repositories/post-comments-repository'
import { PostsRepository } from '../repositories/posts-repository'

type ReplyToCommentUseCaseRequest = {
  authorId: string
  postId: string
  content: string
  replyToId: string
}

type ReplyToCommentUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    comment: PostComment
  }
>

export class ReplyToCommentUseCase {
  constructor(
    private postsRepository: PostsRepository,
    private postCommentsRepository: PostCommentsRepository,
  ) {}

  async execute({
    authorId,
    postId,
    content,
    replyToId,
  }: ReplyToCommentUseCaseRequest): Promise<ReplyToCommentUseCaseResponse> {
    const post = await this.postsRepository.findById(postId)

    if (!post) {
      return left(new ResourceNotFoundError())
    }

    const replyToComment = await this.postCommentsRepository.findById(replyToId)

    if (!replyToComment) {
      return left(new ResourceNotFoundError())
    }

    const replyComment = PostComment.create({
      authorId: new UniqueEntityID(authorId),
      postId: new UniqueEntityID(postId),
      content,
      replyToId: new UniqueEntityID(replyToId),
    })

    await this.postCommentsRepository.create(replyComment)

    return right({ comment: replyComment })
  }
}
