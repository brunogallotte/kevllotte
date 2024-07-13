import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { Tag } from '../../enterprise/entities/tag'
import type { TagsRepository } from '../repositories/tags-repository'

export type CreateTagUseCaseRequest = {
  postId: string
  name: string
}

type CreateTagUseCaseResponse = Either<
  null,
  {
    tag: Tag
  }
>

export class CreateTagUseCase {
  constructor(private tagsRepository: TagsRepository) {}

  async execute({
    postId,
    name,
  }: CreateTagUseCaseRequest): Promise<CreateTagUseCaseResponse> {
    const tag = Tag.create({
      postId: new UniqueEntityID(postId),
      name,
    })

    await this.tagsRepository.create(tag)

    return right({ tag })
  }
}
