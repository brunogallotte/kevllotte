import { makeFollow } from 'test/factories/make-follow'
import { InMemoryFollowsRepository } from 'test/repositories/in-memory-follows-repository'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

import { UnfollowAuthorUseCase } from './unfollow-author'

let inMemoryFollowsRepository: InMemoryFollowsRepository
let sut: UnfollowAuthorUseCase

describe('Unfollow Author', () => {
  beforeEach(() => {
    inMemoryFollowsRepository = new InMemoryFollowsRepository()

    sut = new UnfollowAuthorUseCase(inMemoryFollowsRepository)
  })

  it('should be able to delete a follow', async () => {
    const follow = makeFollow({
      followerAuthorId: new UniqueEntityID('author-1'),
      followingAuthorId: new UniqueEntityID('author-2'),
    })

    await inMemoryFollowsRepository.create(follow)

    const result = await sut.execute({
      followId: follow.id.toString(),
      followerAuthorId: 'author-1',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryFollowsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a follow from another user', async () => {
    const follow = makeFollow({
      followerAuthorId: new UniqueEntityID('author-1'),
    })

    await inMemoryFollowsRepository.create(follow)

    const result = await sut.execute({
      followId: follow.id.toString(),
      followerAuthorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
