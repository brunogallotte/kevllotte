import { makeCommentLike } from 'test/factories/make-comment-like'
import { makePostComment } from 'test/factories/make-post-comment'
import { InMemoryCommentLikesRepository } from 'test/repositories/in-memory-comment-likes-repository'
import { InMemoryPostCommentsRepository } from 'test/repositories/in-memory-post-comments-repository'

import { DislikeCommentUseCase } from './dislike-comment'

let inMemoryPostCommentsRepository: InMemoryPostCommentsRepository
let inMemoryCommentLikesRepository: InMemoryCommentLikesRepository
let sut: DislikeCommentUseCase

describe('Dislike Comment', () => {
  beforeEach(() => {
    inMemoryPostCommentsRepository = new InMemoryPostCommentsRepository()
    inMemoryCommentLikesRepository = new InMemoryCommentLikesRepository()

    sut = new DislikeCommentUseCase(inMemoryCommentLikesRepository)
  })

  it('should be able to dislike a comment', async () => {
    const comment = makePostComment()

    await inMemoryPostCommentsRepository.create(comment)

    const commentLike = makeCommentLike()

    await inMemoryCommentLikesRepository.create(commentLike)

    const authorId = commentLike.authorId.toString()
    const likeId = commentLike.id.toString()

    const result = await sut.execute({
      authorId,
      likeId,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryCommentLikesRepository.items).toHaveLength(0)
  })
})
