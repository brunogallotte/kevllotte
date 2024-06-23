import { makePost } from 'test/factories/make-post'
import { InMemoryPostCommentsRepository } from 'test/repositories/in-memory-post-comments-repository'
import { InMemoryPostsRepository } from 'test/repositories/in-memory-posts-repository'

import { CommentOnPostUseCase } from './comment-on-post'

let inMemoryPostsRepository: InMemoryPostsRepository
let inMemoryPostCommentsRepository: InMemoryPostCommentsRepository
let sut: CommentOnPostUseCase

describe('Comment on Post', () => {
  beforeEach(() => {
    inMemoryPostsRepository = new InMemoryPostsRepository()
    inMemoryPostCommentsRepository = new InMemoryPostCommentsRepository()

    sut = new CommentOnPostUseCase(
      inMemoryPostsRepository,
      inMemoryPostCommentsRepository,
    )
  })

  it('should be able to comment on post', async () => {
    const post = makePost()

    await inMemoryPostsRepository.create(post)

    await sut.execute({
      postId: post.id.toString(),
      authorId: post.authorId.toString(),
      content: 'Comentário teste',
    })

    expect(inMemoryPostCommentsRepository.items[0].content).toEqual(
      'Comentário teste',
    )
  })
})
