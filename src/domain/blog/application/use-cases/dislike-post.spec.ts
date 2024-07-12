import { makePost } from 'test/factories/make-post'
import { makePostLike } from 'test/factories/make-post-like'
import { InMemoryPostLikesRepository } from 'test/repositories/in-memory-post-likes-repository'
import { InMemoryPostsRepository } from 'test/repositories/in-memory-posts-repository'

import { DislikePostUseCase } from './dislike-post'

let inMemoryPostsRepository: InMemoryPostsRepository
let inMemoryPostLikesRepository: InMemoryPostLikesRepository
let sut: DislikePostUseCase

describe('Dislike Post', () => {
  beforeEach(() => {
    inMemoryPostsRepository = new InMemoryPostsRepository()
    inMemoryPostLikesRepository = new InMemoryPostLikesRepository()

    sut = new DislikePostUseCase(inMemoryPostLikesRepository)
  })

  it('should be able to dislike a post', async () => {
    const post = makePost()

    await inMemoryPostsRepository.create(post)

    const postLike = makePostLike()

    await inMemoryPostLikesRepository.create(postLike)

    const authorId = postLike.authorId.toString()
    const likeId = postLike.id.toString()

    const result = await sut.execute({
      authorId,
      likeId,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryPostLikesRepository.items).toHaveLength(0)
  })
})
