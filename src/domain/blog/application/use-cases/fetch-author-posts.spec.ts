import { makePost } from 'test/factories/make-post'
import { InMemoryPostsRepository } from 'test/repositories/in-memory-posts-repository'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { FetchAuthorPostsUseCase } from './fetch-author-posts'

let inMemoryPostsRepository: InMemoryPostsRepository
let sut: FetchAuthorPostsUseCase

describe('Fetch Author Posts', () => {
  beforeEach(() => {
    inMemoryPostsRepository = new InMemoryPostsRepository()

    sut = new FetchAuthorPostsUseCase(inMemoryPostsRepository)
  })

  it('should be able to fetch author posts', async () => {
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
      authorId: 'author-1',
      page: 1,
    })

    expect(result.value?.posts).toHaveLength(3)
  })

  it('should be able to fetch paginated author posts', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryPostsRepository.create(
        makePost({
          authorId: new UniqueEntityID('author-1'),
        }),
      )
    }

    const result = await sut.execute({
      authorId: 'author-1',
      page: 2,
    })

    expect(result.value?.posts).toHaveLength(2)
  })
})
