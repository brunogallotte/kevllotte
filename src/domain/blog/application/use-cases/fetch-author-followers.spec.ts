import { makeFollow } from 'test/factories/make-follow'
import { InMemoryFollowsRepository } from 'test/repositories/in-memory-follows-repository'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { FetchAuthorFollowersUseCase } from './fetch-author-followers'

let inMemoryFollowsRepository: InMemoryFollowsRepository
let sut: FetchAuthorFollowersUseCase

describe('Fetch Author Followers', () => {
  beforeEach(() => {
    inMemoryFollowsRepository = new InMemoryFollowsRepository()

    sut = new FetchAuthorFollowersUseCase(inMemoryFollowsRepository)
  })

  it('should be able to fetch author followers', async () => {
    await inMemoryFollowsRepository.create(
      makeFollow({
        followingAuthorId: new UniqueEntityID('author-1'),
      }),
    )

    await inMemoryFollowsRepository.create(
      makeFollow({
        followingAuthorId: new UniqueEntityID('author-1'),
      }),
    )

    await inMemoryFollowsRepository.create(
      makeFollow({
        followingAuthorId: new UniqueEntityID('author-1'),
      }),
    )

    const result = await sut.execute({
      authorId: 'author-1',
      page: 1,
    })

    expect(result.value?.followers).toHaveLength(3)
  })

  it('should be able to fetch paginated author followers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryFollowsRepository.create(
        makeFollow({
          followingAuthorId: new UniqueEntityID('author-1'),
        }),
      )
    }

    const result = await sut.execute({
      authorId: 'author-1',
      page: 2,
    })

    expect(result.value?.followers).toHaveLength(2)
  })
})
