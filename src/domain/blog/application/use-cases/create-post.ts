import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { Post, type POST_STATUS } from '../../enterprise/entities/post'
import type { PostsRepository } from '../repositories/posts-repository'

export type CreatePostUseCaseRequest = {
  authorId: string
  title: string
  content: string
  status: POST_STATUS
  collabId?: string
}

type CreatePostUseCaseResponse = Either<
  null,
  {
    post: Post
  }
>

export class CreatePostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({
    authorId,
    title,
    content,
    status,
    collabId,
  }: CreatePostUseCaseRequest): Promise<CreatePostUseCaseResponse> {
    const post = Post.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
      status,
      collabId: collabId ? new UniqueEntityID(collabId) : undefined,
    })

    await this.postsRepository.create(post)

    return right({ post })
  }
}
