import { makePostComment } from 'test/factories/make-post-comment'
import { InMemoryPostCommentsRepository } from 'test/repositories/in-memory-post-comments-repository'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { FetchPostCommentsUseCase } from './fetch-post-comments'

let inMemoryPostCommentsRepository: InMemoryPostCommentsRepository
let sut: FetchPostCommentsUseCase

describe('Fetch Post Comments', () => {
  beforeEach(() => {
    inMemoryPostCommentsRepository = new InMemoryPostCommentsRepository()

    sut = new FetchPostCommentsUseCase(inMemoryPostCommentsRepository)
  })

  it('should be able to fetch post comments', async () => {
    await inMemoryPostCommentsRepository.create(
      makePostComment({
        postId: new UniqueEntityID('post-01'),
      }),
    )

    await inMemoryPostCommentsRepository.create(
      makePostComment({
        postId: new UniqueEntityID('post-01'),
      }),
    )

    await inMemoryPostCommentsRepository.create(
      makePostComment({
        postId: new UniqueEntityID('post-01'),
      }),
    )

    const result = await sut.execute({
      postId: 'post-01',
      page: 1,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.postComments).toHaveLength(3)
  })

  it('should be able to fetch paginated author post comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryPostCommentsRepository.create(
        makePostComment({
          postId: new UniqueEntityID('post-01'),
        }),
      )
    }

    const result = await sut.execute({
      postId: 'post-01',
      page: 2,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.postComments).toHaveLength(2)
  })
})
