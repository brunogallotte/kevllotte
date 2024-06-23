import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { Post, type POST_STATUS } from '../../enterprise/entities/post'
import { PostsRepository } from '../repositories/posts-repository'

type EditPostUseCaseRequest = {
  postId: string
  authorId: string
  title: string
  content: string
  status: POST_STATUS
  collabId?: string
}

type EditPostUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    post: Post
  }
>

export class EditPostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({
    postId,
    authorId,
    title,
    content,
    status,
    // collabId,
  }: EditPostUseCaseRequest): Promise<EditPostUseCaseResponse> {
    const post = await this.postsRepository.findById(postId)

    if (!post) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== post.authorId.toString()) {
      return left(new NotAllowedError())
    }

    post.title = title
    post.content = content
    post.status = status
    // TODO: PERGUNTAR PRO GALLOTTE SE VAI PODER TROCAR A PESSOA QUE VOCÊ CRIOU O POST JUNTO
    // post.collabId = collabId

    await this.postsRepository.save(post)

    return right({ post })
  }
}
