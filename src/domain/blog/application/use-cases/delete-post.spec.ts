import { makePost } from 'test/factories/make-post'
import { InMemoryPostsRepository } from 'test/repositories/in-memory-posts-repository'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

import { DeletePostUseCase } from './delete-post'

let inMemoryPostsRepository: InMemoryPostsRepository
let sut: DeletePostUseCase

describe('Delete Post', () => {
  beforeEach(() => {
    inMemoryPostsRepository = new InMemoryPostsRepository()

    sut = new DeletePostUseCase(inMemoryPostsRepository)
  })

  it('should be able to delete a post', async () => {
    const post = makePost(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('post-1'),
    )

    await inMemoryPostsRepository.create(post)

    const result = await sut.execute({
      authorId: 'author-1',
      postId: 'post-1',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryPostsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a post from another user', async () => {
    const post = makePost(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('post-1'),
    )

    await inMemoryPostsRepository.create(post)

    const result = await sut.execute({
      authorId: 'author-2',
      postId: 'post-1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
