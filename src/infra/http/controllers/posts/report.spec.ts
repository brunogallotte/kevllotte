import request from 'supertest'
import { AuthorFactory } from 'test/factories/make-author'
import { PostFactory } from 'test/factories/make-post'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '../../app'

describe('Report Post (e2e)', () => {
  let authorFactory: AuthorFactory
  let postFactory: PostFactory

  beforeAll(async () => {
    authorFactory = new AuthorFactory()
    postFactory = new PostFactory()

    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to report a post', async () => {
    const user = await authorFactory.makePrismaAuthor()

    const accessToken = app.jwt.sign({ sub: user.id.toString() })

    const post = await postFactory.makePrismaPost({
      authorId: user.id,
    })

    const userId = user.id.toString()
    const postId = post.id.toString()

    const response = await request(app.server)
      .post(`/posts/${postId}/report`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        reason: 'Report reason',
        description: 'Report description',
      })

    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual({
      report: expect.objectContaining({
        reportedById: userId,
        reportedPostId: postId,
        reason: 'Report reason',
        description: 'Report description',
      }),
    })
  })
})
