import { InMemoryPostCommentsRepository } from 'test/repositories/in-memory-post-comments-repository'
import { InMemoryPostsRepository } from 'test/repositories/in-memory-posts-repository'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { PostComment } from '../../enterprise/entities/post-comment'
import { ReplyToCommentUseCase } from './reply-to-comment'

let inMemoryPostsRepository: InMemoryPostsRepository
let inMemoryPostCommentsRepository: InMemoryPostCommentsRepository
let sut: ReplyToCommentUseCase

describe('Reply To Comment', () => {
  beforeEach(() => {
    inMemoryPostsRepository = new InMemoryPostsRepository()
    inMemoryPostCommentsRepository = new InMemoryPostCommentsRepository()

    sut = new ReplyToCommentUseCase(
      inMemoryPostsRepository,
      inMemoryPostCommentsRepository,
    )
  })

  it('should be able to reply a comment', async () => {
    const comment = PostComment.create({
      authorId: new UniqueEntityID('author-01'),
      content: 'Comment 01',
      postId: new UniqueEntityID('post-01'),
    })

    inMemoryPostCommentsRepository.create(comment)

    const result = await sut.execute({
      postId: 'post-01',
      authorId: 'author-01',
      content: 'Reply to comment 01',
      replyToId: comment.id.toString(),
    })

    if (result.isRight()) {
      expect(result.value.comment.content).toEqual('Reply to comment 01')
      expect(result.value.comment.replyToId).toEqual(comment.id)
    }
  })
})
