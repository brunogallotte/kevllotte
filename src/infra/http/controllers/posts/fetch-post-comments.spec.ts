import request from 'supertest'
import { AuthorFactory } from 'test/factories/make-author'
import { PostFactory } from 'test/factories/make-post'
import { PostCommentFactory } from 'test/factories/make-post-comment'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '../../app'

describe('Fetch Post Comments (e2e)', () => {
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

  it('should be able to fetch author posts', async () => {
    const user = await authorFactory.makePrismaAuthor()

    const accessToken = app.jwt.sign({ sub: user.id.toString() })

    const post = await postFactory.makePrismaPost({
      authorId: user.id,
      title: 'Post 01',
    })

    const postId = post.id.toString()

    const [postComment, anotherPostComment] = await Promise.all([
      await postCommentFactory.makePrismaPostComment({
        authorId: user.id,
        postId: post.id,
        content: 'Post Comment 01',
      }),
      await postCommentFactory.makePrismaPostComment({
        authorId: user.id,
        postId: post.id,
        content: 'Post Comment 02',
      }),
    ])

    const response = await request(app.server)
      .get(`/posts/${postId}/comments`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toEqual(200)

    expect(response.body).toEqual({
      postComments: expect.arrayContaining([
        expect.objectContaining({
          id: postComment.id.toString(),
          authorId: user.id.toString(),
          content: 'Post Comment 01',
        }),
        expect.objectContaining({
          id: anotherPostComment.id.toString(),
          authorId: user.id.toString(),
          content: 'Post Comment 02',
        }),
      ]),
    })
  })
})
