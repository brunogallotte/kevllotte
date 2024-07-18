import { makePost } from 'test/factories/make-post'
import { InMemoryPostsRepository } from 'test/repositories/in-memory-posts-repository'
import { InMemorySavedPostsRepository } from 'test/repositories/in-memory-saved-posts-repository'

import { SavePostUseCase } from './save-post'

let inMemoryPostsRepository: InMemoryPostsRepository
let inMemorySavedPostsRepository: InMemorySavedPostsRepository
let sut: SavePostUseCase

describe('Save Post', () => {
  beforeEach(() => {
    inMemoryPostsRepository = new InMemoryPostsRepository()
    inMemorySavedPostsRepository = new InMemorySavedPostsRepository()

    sut = new SavePostUseCase(
      inMemoryPostsRepository,
      inMemorySavedPostsRepository,
    )
  })

  it('should be able to save a post', async () => {
    const post = makePost()

    await inMemoryPostsRepository.create(post)

    const result = await sut.execute({
      postId: post.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemorySavedPostsRepository.items[0]).toEqual(post)
  })
})
