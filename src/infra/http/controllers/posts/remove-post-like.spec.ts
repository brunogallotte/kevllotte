import request from 'supertest'
import { AuthorFactory } from 'test/factories/make-author'
import { PostFactory } from 'test/factories/make-post'
import { PostLikeFactory } from 'test/factories/make-post-like'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '../../app'

describe('Remove Post Post (e2e)', () => {
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

  it('should be able to remove a post like', async () => {
    const user = await authorFactory.makePrismaAuthor()

    const accessToken = app.jwt.sign({ sub: user.id.toString() })

    const post = await postFactory.makePrismaPost({
      authorId: user.id,
    })

    const postId = post.id.toString()

    const like = await postLikeFactory.makePrismaPostLike({
      authorId: user.id,
      postId: post.id,
    })

    const likeId = like.id.toString()

    const response = await request(app.server)
      .post(`/posts/${postId}/likes/${likeId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toEqual(200)
  })
})
