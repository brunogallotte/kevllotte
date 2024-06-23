import { makePost } from 'test/factories/make-post'
import { InMemoryPostsRepository } from 'test/repositories/in-memory-posts-repository'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

import { POST_STATUS } from '../../enterprise/entities/post'
import { EditPostUseCase } from './edit-post'

let inMemoryPostsRepository: InMemoryPostsRepository
let sut: EditPostUseCase

describe('Edit Post', () => {
  beforeEach(() => {
    inMemoryPostsRepository = new InMemoryPostsRepository()

    sut = new EditPostUseCase(inMemoryPostsRepository)
  })

  it('should be able to edit a post', async () => {
    const newPost = makePost(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('post-1'),
    )

    await inMemoryPostsRepository.create(newPost)

    const result = await sut.execute({
      postId: newPost.id.toString(),
      authorId: 'author-1',
      title: 'Post test title',
      content: 'Test content',
      status: POST_STATUS.PUBLISHED,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryPostsRepository.items[0]).toMatchObject({
      title: 'Post test title',
      content: 'Test content',
      status: POST_STATUS.PUBLISHED,
    })
  })

  it('should not be able to edit a post from another user', async () => {
    const newPost = makePost(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('post-1'),
    )

    await inMemoryPostsRepository.create(newPost)

    const result = await sut.execute({
      postId: newPost.id.toString(),
      authorId: 'author-2',
      title: 'Post test title',
      content: 'Test content',
      status: POST_STATUS.PUBLISHED,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
