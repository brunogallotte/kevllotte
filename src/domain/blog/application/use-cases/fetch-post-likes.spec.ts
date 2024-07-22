import { makePostLike } from 'test/factories/make-post-like'
import { InMemoryPostLikesRepository } from 'test/repositories/in-memory-post-likes-repository'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { FetchPostLikesUseCase } from './fetch-post-likes'

let inMemoryPostLikesRepository: InMemoryPostLikesRepository
let sut: FetchPostLikesUseCase

describe('Fetch Post Likes', () => {
  beforeEach(() => {
    inMemoryPostLikesRepository = new InMemoryPostLikesRepository()

    sut = new FetchPostLikesUseCase(inMemoryPostLikesRepository)
  })

  it('should be able to fetch post likes', async () => {
    await inMemoryPostLikesRepository.create(
      makePostLike({
        postId: new UniqueEntityID('post-01'),
      }),
    )

    await inMemoryPostLikesRepository.create(
      makePostLike({
        postId: new UniqueEntityID('post-01'),
      }),
    )

    await inMemoryPostLikesRepository.create(
      makePostLike({
        postId: new UniqueEntityID('post-01'),
      }),
    )

    const result = await sut.execute({
      postId: 'post-01',
      page: 1,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.postLikes).toHaveLength(3)
  })

  it('should be able to fetch paginated author post likes', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryPostLikesRepository.create(
        makePostLike({
          postId: new UniqueEntityID('post-01'),
        }),
      )
    }

    const result = await sut.execute({
      postId: 'post-01',
      page: 2,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.postLikes).toHaveLength(2)
  })
})
