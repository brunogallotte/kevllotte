import { Either, right } from '@/core/either'

import type { Tag } from '../../enterprise/entities/tag'
import type { TagsRepository } from '../repositories/tags-repository'

type FetchPostTagsUseCaseRequest = {
  postId: string
  page: number
}

type FetchPostTagsUseCaseResponse = Either<
  null,
  {
    tags: Tag[]
  }
>

export class FetchPostTagsUseCase {
  constructor(private tagsRepository: TagsRepository) {}

  async execute({
    postId,
    page,
  }: FetchPostTagsUseCaseRequest): Promise<FetchPostTagsUseCaseResponse> {
    const tags = await this.tagsRepository.findManyByPostId(postId, { page })

    return right({ tags })
  }
}
