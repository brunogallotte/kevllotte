import { makePostComment } from 'test/factories/make-post-comment'
import { InMemoryCommentLikesRepository } from 'test/repositories/in-memory-comment-likes-repository'
import { InMemoryPostCommentsRepository } from 'test/repositories/in-memory-post-comments-repository'

import { LikeCommentUseCase } from './like-comment'

let inMemoryPostCommentsRepository: InMemoryPostCommentsRepository
let inMemoryCommentLikesRepository: InMemoryCommentLikesRepository
let sut: LikeCommentUseCase

describe('Like Comment', () => {
  beforeEach(() => {
    inMemoryPostCommentsRepository = new InMemoryPostCommentsRepository()
    inMemoryCommentLikesRepository = new InMemoryCommentLikesRepository()

    sut = new LikeCommentUseCase(
      inMemoryPostCommentsRepository,
      inMemoryCommentLikesRepository,
    )
  })

  it('should be able to like a comment', async () => {
    const comment = makePostComment()

    await inMemoryPostCommentsRepository.create(comment)

    const result = await sut.execute({
      commentId: comment.id.toString(),
      authorId: comment.authorId.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryCommentLikesRepository.items).toHaveLength(1)
  })
})
