import { makePostComment } from 'test/factories/make-post-comment'
import { InMemoryPostCommentsRepository } from 'test/repositories/in-memory-post-comments-repository'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

import { EditPostCommentUseCase } from './edit-post-comment'

let inMemoryPostCommentsRepository: InMemoryPostCommentsRepository
let sut: EditPostCommentUseCase

describe('Edit Post Comment', () => {
  beforeEach(() => {
    inMemoryPostCommentsRepository = new InMemoryPostCommentsRepository()

    sut = new EditPostCommentUseCase(inMemoryPostCommentsRepository)
  })

  it('should be able to edit a post comment', async () => {
    const postComment = makePostComment(
      {
        authorId: new UniqueEntityID('author-1'),
        content: 'Comment content',
      },
      new UniqueEntityID('post-1'),
    )

    await inMemoryPostCommentsRepository.create(postComment)

    const result = await sut.execute({
      commentId: postComment.id.toString(),
      authorId: 'author-1',
      content: 'Test content',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryPostCommentsRepository.items[0]).toMatchObject({
      content: 'Test content',
    })
  })

  it('should not be able to edit a post from another user', async () => {
    const postComment = makePostComment(
      {
        authorId: new UniqueEntityID('author-1'),
        content: 'Comment content',
      },
      new UniqueEntityID('post-1'),
    )

    await inMemoryPostCommentsRepository.create(postComment)

    const result = await sut.execute({
      authorId: 'author-2',
      commentId: postComment.id.toString(),
      content: 'Test content',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
