import request from 'supertest'
import { AuthorFactory } from 'test/factories/make-author'
import { PostFactory } from 'test/factories/make-post'
import { PostCommentFactory } from 'test/factories/make-post-comment'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '../../app'

describe('Edit Post Comment (e2e)', () => {
  let authorFactory: AuthorFactory
  let postFactory: PostFactory
  let postCommentFactory: PostCommentFactory

  beforeAll(async () => {
    authorFactory = new AuthorFactory()
    postFactory = new PostFactory()
    postCommentFactory = new PostCommentFactory()
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to edit a post comment', async () => {
    const user = await authorFactory.makePrismaAuthor()

    const accessToken = app.jwt.sign({ sub: user.id.toString() })

    const post = await postFactory.makePrismaPost({
      authorId: user.id,
    })

    const postComment = await postCommentFactory.makePrismaPostComment({
      postId: post.id,
      authorId: user.id,
      content: 'Test post comment',
    })

    const postCommentId = postComment.id.toString()

    const response = await request(app.server)
      .put(`/posts/comments/${postCommentId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        content: 'Edited post comment',
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.postComment).toEqual(
      expect.objectContaining({
        content: 'Edited post comment',
      }),
    )
  })
})
