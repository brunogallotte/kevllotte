import { makePost } from 'test/factories/make-post'
import { InMemorySavedPostsRepository } from 'test/repositories/in-memory-saved-posts-repository'

import { RemoveSavedPostUseCase } from './remove-saved-post'

let inMemorySavedPostsRepository: InMemorySavedPostsRepository
let sut: RemoveSavedPostUseCase

describe('Remove Saved Post', () => {
  beforeEach(() => {
    inMemorySavedPostsRepository = new InMemorySavedPostsRepository()

    sut = new RemoveSavedPostUseCase(inMemorySavedPostsRepository)
  })

  it('should be able to remove a saved post', async () => {
    const post = makePost()

    await inMemorySavedPostsRepository.create(post)

    const result = await sut.execute({
      savedPostId: post.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemorySavedPostsRepository.items).toHaveLength(0)
  })
})
