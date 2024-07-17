import { makePost } from 'test/factories/make-post'
import { InMemoryPostsRepository } from 'test/repositories/in-memory-posts-repository'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { FetchPostsUseCase } from './fetch-posts'

let inMemoryPostsRepository: InMemoryPostsRepository
let sut: FetchPostsUseCase

describe('Fetch Posts', () => {
  beforeEach(() => {
    inMemoryPostsRepository = new InMemoryPostsRepository()

    sut = new FetchPostsUseCase(inMemoryPostsRepository)
  })

  it('should be able to fetch posts', async () => {
    await inMemoryPostsRepository.create(
      makePost({
        authorId: new UniqueEntityID('author-1'),
      }),
    )

    await inMemoryPostsRepository.create(
      makePost({
        authorId: new UniqueEntityID('author-1'),
      }),
    )

    await inMemoryPostsRepository.create(
      makePost({
        authorId: new UniqueEntityID('author-1'),
      }),
    )

    const result = await sut.execute({
      page: 1,
    })

    expect(result.value?.posts).toHaveLength(3)
  })

  it('should be able to fetch paginated posts', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryPostsRepository.create(
        makePost({
          authorId: new UniqueEntityID('author-1'),
        }),
      )
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.value?.posts).toHaveLength(2)
  })
})
