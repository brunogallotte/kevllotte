import { makeRegister } from 'test/factories/makeRegister'
import { InMemoryPostsRepository } from 'test/repositories/in-memory-posts-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { NotAllowedError } from '@/core/errors/not-allowed-error'

import { DeletePostUseCase } from './delete-post'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryPostsRepository: InMemoryPostsRepository
let sut: DeletePostUseCase

describe('Delete Post', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryPostsRepository = new InMemoryPostsRepository()
    sut = new DeletePostUseCase(
      inMemoryUsersRepository,
      inMemoryPostsRepository,
    )
  })

  it('should be able to delete a post', async () => {
    const user = makeRegister()

    await inMemoryUsersRepository.create(user)

    const post = await inMemoryPostsRepository.create({
      title: 'Test Post Title',
      content: 'Test Post Content',
      userId: user.id,
      id: 'post-1',
    })

    const result = await sut.execute({
      userId: user.id,
      postId: post.id,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryPostsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a post from another user', async () => {
    const user = makeRegister({
      id: 'user-1',
    })

    const anotherUser = makeRegister({
      id: 'user-2',
    })

    await inMemoryUsersRepository.create(user)
    await inMemoryUsersRepository.create(anotherUser)

    const post = await inMemoryPostsRepository.create({
      title: 'Test Post Title',
      content: 'Test Post Content',
      userId: user.id,
      id: 'post-1',
    })

    const result = await sut.execute({
      userId: anotherUser.id,
      postId: post.id,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
