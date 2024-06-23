import { InMemoryPostsRepository } from 'test/repositories/in-memory-posts-repository'

import { POST_STATUS } from '../../enterprise/entities/post'
import { CreatePostUseCase } from './create-post'

let inMemoryPostsRepository: InMemoryPostsRepository
let sut: CreatePostUseCase

describe('Create Post', () => {
  beforeEach(() => {
    inMemoryPostsRepository = new InMemoryPostsRepository()

    sut = new CreatePostUseCase(inMemoryPostsRepository)
  })

  it('should be able to create a post', async () => {
    const result = await sut.execute({
      authorId: '1',
      title: 'New post',
      content: 'Post content',
      status: POST_STATUS.DRAFT,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryPostsRepository.items[0]).toEqual(result.value?.post)
  })

  it('should be able to create a post with a collaborator', async () => {
    const result = await sut.execute({
      authorId: '1',
      title: 'New post',
      content: 'Post content',
      status: POST_STATUS.PUBLISHED,
      collabId: '2',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryPostsRepository.items[0].collabId).toEqual(
      result.value?.post.collabId,
    )
  })
})
