import request from 'supertest'
import { AuthorFactory } from 'test/factories/make-author'
import { PostFactory } from 'test/factories/make-post'
import { PostLikeFactory } from 'test/factories/make-post-like'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '../../app'

describe('Fetch Post Likes (e2e)', () => {
  let authorFactory: AuthorFactory
  let postFactory: PostFactory
  let postLikeFactory: PostLikeFactory

  beforeAll(async () => {
    authorFactory = new AuthorFactory()
    postFactory = new PostFactory()
    postLikeFactory = new PostLikeFactory()

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

    const [postLike, anotherPostLike] = await Promise.all([
      await postLikeFactory.makePrismaPostLike({
        authorId: user.id,
        postId: post.id,
      }),
      await postLikeFactory.makePrismaPostLike({
        authorId: user.id,
        postId: post.id,
      }),
    ])

    const response = await request(app.server)
      .get(`/posts/${postId}/likes`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toEqual(200)

    expect(response.body).toEqual({
      postLikes: expect.arrayContaining([
        expect.objectContaining({
          id: postLike.id.toString(),
          authorId: user.id.toString(),
          postId: post.id.toString(),
        }),
        expect.objectContaining({
          id: anotherPostLike.id.toString(),
          authorId: user.id.toString(),
          postId: post.id.toString(),
        }),
      ]),
    })
  })
})
