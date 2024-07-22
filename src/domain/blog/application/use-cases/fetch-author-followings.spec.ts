import { makeFollow } from 'test/factories/make-follow'
import { InMemoryFollowsRepository } from 'test/repositories/in-memory-follows-repository'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { FetchAuthorFollowingsUseCase } from './fetch-author-followings'

let inMemoryFollowsRepository: InMemoryFollowsRepository
let sut: FetchAuthorFollowingsUseCase

describe('Fetch Author Followings', () => {
  beforeEach(() => {
    inMemoryFollowsRepository = new InMemoryFollowsRepository()

    sut = new FetchAuthorFollowingsUseCase(inMemoryFollowsRepository)
  })

  it('should be able to fetch author followings', async () => {
    await inMemoryFollowsRepository.create(
      makeFollow({
        followerAuthorId: new UniqueEntityID('author-1'),
      }),
    )

    await inMemoryFollowsRepository.create(
      makeFollow({
        followerAuthorId: new UniqueEntityID('author-1'),
      }),
    )

    await inMemoryFollowsRepository.create(
      makeFollow({
        followerAuthorId: new UniqueEntityID('author-1'),
      }),
    )

    const result = await sut.execute({
      authorId: 'author-1',
      page: 1,
    })

    expect(result.value?.followings).toHaveLength(3)
  })

  it('should be able to fetch paginated author followings', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryFollowsRepository.create(
        makeFollow({
          followerAuthorId: new UniqueEntityID('author-1'),
        }),
      )
    }

    const result = await sut.execute({
      authorId: 'author-1',
      page: 2,
    })

    expect(result.value?.followings).toHaveLength(2)
  })
})
