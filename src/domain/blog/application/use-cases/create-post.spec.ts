import { makeRegister } from 'test/factories/makeRegister'
import { InMemoryPostsRepository } from 'test/repositories/in-memory-posts-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { CreatePostUseCase } from './create-post'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryPostsRepository: InMemoryPostsRepository
let sut: CreatePostUseCase

describe('Create Post', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryPostsRepository = new InMemoryPostsRepository()
    sut = new CreatePostUseCase(
      inMemoryUsersRepository,
      inMemoryPostsRepository,
    )
  })

  it('should be able to create a post', async () => {
    const user = makeRegister()

    await inMemoryUsersRepository.create(user)

    const result = await sut.execute({
      title: 'Test Post Title',
      content: 'Test Post Content',
      userId: user.id,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryPostsRepository.items[0].title).toEqual('Test Post Title')
    expect(inMemoryPostsRepository.items[0].userId).toEqual(user.id)
  })

  it('should not be able to create a post without being related to an existing user', async () => {
    const result = await sut.execute({
      title: 'Test Post Title',
      content: 'Test Post Content',
      userId: 'non-existing-id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
