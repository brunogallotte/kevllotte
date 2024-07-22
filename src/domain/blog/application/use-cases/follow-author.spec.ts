import { InMemoryFollowsRepository } from 'test/repositories/in-memory-follows-repository'

import { FollowAuthorUseCase } from './follow-author'

let inMemoryFollowsRepository: InMemoryFollowsRepository
let sut: FollowAuthorUseCase

describe('Follow Author', () => {
  beforeEach(() => {
    inMemoryFollowsRepository = new InMemoryFollowsRepository()

    sut = new FollowAuthorUseCase(inMemoryFollowsRepository)
  })

  it('should be able to create a follow', async () => {
    const result = await sut.execute({
      followerAuthorId: 'author-01',
      followingAuthorId: 'author-02',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryFollowsRepository.items[0]).toEqual(result.value?.follow)
  })
})
