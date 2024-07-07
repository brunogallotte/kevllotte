import { makePost } from 'test/factories/make-post'
import { InMemoryPostLikesRepository } from 'test/repositories/in-memory-post-likes-repository'
import { InMemoryPostsRepository } from 'test/repositories/in-memory-posts-repository'

import { LikePostUseCase } from './like-post'

let inMemoryPostsRepository: InMemoryPostsRepository
let inMemoryPostLikesRepository: InMemoryPostLikesRepository
let sut: LikePostUseCase

describe('Like Post', () => {
  beforeEach(() => {
    inMemoryPostsRepository = new InMemoryPostsRepository()
    inMemoryPostLikesRepository = new InMemoryPostLikesRepository()

    sut = new LikePostUseCase(
      inMemoryPostsRepository,
      inMemoryPostLikesRepository,
    )
  })

  it('should be able to like a post', async () => {
    const post = makePost()

    await inMemoryPostsRepository.create(post)

    const result = await sut.execute({
      postId: post.id.toString(),
      authorId: post.authorId.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryPostLikesRepository.items).toHaveLength(1)
  })
})
