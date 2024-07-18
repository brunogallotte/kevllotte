import request from 'supertest'
import { AuthorFactory } from 'test/factories/make-author'
import { PostFactory } from 'test/factories/make-post'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { prisma } from '@/lib/prisma'

import { app } from '../../app'

describe('Fetch Saved Posts (e2e)', () => {
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

  it('should be able to fetch author posts', async () => {
    const user = await authorFactory.makePrismaAuthor()

    const accessToken = app.jwt.sign({ sub: user.id.toString() })

    const [post, anotherPost] = await Promise.all([
      await postFactory.makePrismaPost({
        authorId: user.id,
        title: 'Post 01',
      }),
      await postFactory.makePrismaPost({
        authorId: user.id,
        title: 'Post 02',
      }),
    ])

    const userId = user.id.toString()

    await Promise.all([
      prisma.savedPost.create({
        data: {
          userId,
          postId: post.id.toString(),
        },
      }),
      prisma.savedPost.create({
        data: {
          userId,
          postId: anotherPost.id.toString(),
        },
      }),
    ])

    const response = await request(app.server)
      .get('/posts/save')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      savedPosts: expect.arrayContaining([
        expect.objectContaining({
          id: post.id.toString(),
          userId: user.id.toString(),
          title: 'Post 01',
        }),
        expect.objectContaining({
          id: anotherPost.id.toString(),
          userId: user.id.toString(),
          title: 'Post 02',
        }),
      ]),
    })
  })
})
