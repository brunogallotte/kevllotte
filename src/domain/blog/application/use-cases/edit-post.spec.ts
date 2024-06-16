import { makeRegister } from 'test/factories/makeRegister'
import { InMemoryPostsRepository } from 'test/repositories/in-memory-posts-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { EditPostUseCase } from './edit-post'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryPostsRepository: InMemoryPostsRepository
let sut: EditPostUseCase

describe('Edit Post', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryPostsRepository = new InMemoryPostsRepository()
    sut = new EditPostUseCase(inMemoryPostsRepository)
  })

  it('should be able to edit a post title', async () => {
    const user = makeRegister()

    await inMemoryUsersRepository.create(user)

    const createdPost = await inMemoryPostsRepository.create({
      title: 'Test Post Title',
      content: 'Test Post Content',
      userId: user.id,
    })

    const result = await sut.execute({
      postId: createdPost.id,
      title: 'Test Post Title Edited',
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(result.value.updatedPost.title).toEqual('Test Post Title Edited')
      expect(result.value.updatedPost.userId).toEqual(user.id)
    }
  })

  it('should be able to edit a post content', async () => {
    const user = makeRegister()

    await inMemoryUsersRepository.create(user)

    const createdPost = await inMemoryPostsRepository.create({
      title: 'Test Post Title',
      content: 'Test Post Content',
      userId: user.id,
    })

    const result = await sut.execute({
      postId: createdPost.id,
      content: 'Test Post Content Edited',
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(result.value.updatedPost.content).toEqual(
        'Test Post Content Edited',
      )
      expect(result.value.updatedPost.userId).toEqual(user.id)
    }
  })

  it('should not be able to edit a post with an non existing post id', async () => {
    const result = await sut.execute({
      postId: 'non-existing-id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
