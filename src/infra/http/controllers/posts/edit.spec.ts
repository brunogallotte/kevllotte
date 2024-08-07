import request from 'supertest'
import { AuthorFactory } from 'test/factories/make-author'
import { PostFactory } from 'test/factories/make-post'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '../../app'

describe('Edit Post (e2e)', () => {
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

  it('should be able to edit a post', async () => {
    const user = await authorFactory.makePrismaAuthor()

    const accessToken = app.jwt.sign({ sub: user.id.toString() })

    const post = await postFactory.makePrismaPost({
      authorId: user.id,
    })

    const postId = post.id.toString()

    const response = await request(app.server)
      .put(`/posts/${postId}/edit`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Edited post',
        content: 'Edited post',
        status: 'PUBLISHED',
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.post).toEqual(
      expect.objectContaining({
        title: 'Edited post',
        content: 'Edited post',
      }),
    )
  })
})
