import request from 'supertest'
import { AuthorFactory } from 'test/factories/make-author'
import { PostFactory } from 'test/factories/make-post'
import { PostTagFactory } from 'test/factories/make-post-tag'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '../../app'

describe('Fetch Post Tags (e2e)', () => {
  let authorFactory: AuthorFactory
  let postFactory: PostFactory
  let postTagFactory: PostTagFactory

  beforeAll(async () => {
    authorFactory = new AuthorFactory()
    postFactory = new PostFactory()
    postTagFactory = new PostTagFactory()

    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch post tags', async () => {
    const user = await authorFactory.makePrismaAuthor()

    const accessToken = app.jwt.sign({ sub: user.id.toString() })

    const post = await postFactory.makePrismaPost({
      authorId: user.id,
      title: 'Post 01',
    })

    const postId = post.id.toString()

    const [postTag, anotherPostTag] = await Promise.all([
      await postTagFactory.makePrismaPostTag({
        postId: post.id,
        name: 'Post Tag 01',
      }),

      await postTagFactory.makePrismaPostTag({
        postId: post.id,
        name: 'Post Tag 02',
      }),
    ])

    const response = await request(app.server)
      .get(`/posts/${postId}/tags`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toEqual(200)

    expect(response.body).toEqual({
      postTags: expect.arrayContaining([
        expect.objectContaining({
          id: postTag.id.toString(),
          postId,
          name: 'Post Tag 01',
        }),
        expect.objectContaining({
          id: anotherPostTag.id.toString(),
          postId,
          name: 'Post Tag 02',
        }),
      ]),
    })
  })
})
