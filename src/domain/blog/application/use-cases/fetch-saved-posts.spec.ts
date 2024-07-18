import { makePost } from 'test/factories/make-post'
import { InMemorySavedPostsRepository } from 'test/repositories/in-memory-saved-posts-repository'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { FetchSavedPostsUseCase } from './fetch-saved-posts'

let inMemorySavedPostsRepository: InMemorySavedPostsRepository
let sut: FetchSavedPostsUseCase

describe('Fetch Saved Posts', () => {
  beforeEach(() => {
    inMemorySavedPostsRepository = new InMemorySavedPostsRepository()

    sut = new FetchSavedPostsUseCase(inMemorySavedPostsRepository)
  })

  it('should be able to fetch saved posts', async () => {
    await inMemorySavedPostsRepository.create(
      makePost({
        authorId: new UniqueEntityID('author-1'),
      }),
    )

    await inMemorySavedPostsRepository.create(
      makePost({
        authorId: new UniqueEntityID('author-1'),
      }),
    )

    await inMemorySavedPostsRepository.create(
      makePost({
        authorId: new UniqueEntityID('author-1'),
      }),
    )

    const result = await sut.execute({
      authorId: 'author-1',
      page: 1,
    })

    expect(result.value?.savedPosts).toHaveLength(3)
  })

  it('should be able to fetch paginated saved posts', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemorySavedPostsRepository.create(
        makePost({
          authorId: new UniqueEntityID('author-1'),
        }),
      )
    }

    const result = await sut.execute({
      authorId: 'author-1',
      page: 2,
    })

    expect(result.value?.savedPosts).toHaveLength(2)
  })
})
