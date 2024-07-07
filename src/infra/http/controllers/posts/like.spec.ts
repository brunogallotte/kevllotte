import request from 'supertest'
import { AuthorFactory } from 'test/factories/make-author'
import { PostFactory } from 'test/factories/make-post'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { prisma } from '@/lib/prisma'

import { app } from '../../app'

describe('Like Post (e2e)', () => {
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

  it('should be able to like a post', async () => {
    const user = await authorFactory.makePrismaAuthor()

    const accessToken = app.jwt.sign({ sub: user.id.toString() })

    const post = await postFactory.makePrismaPost({
      authorId: user.id,
    })

    const postId = post.id.toString()

    const response = await request(app.server)
      .post(`/posts/${postId}/like`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toEqual(201)

    const postLikeOnDatabase = await prisma.postLike.findFirst({
      where: {
        postId,
      },
    })

    expect(postLikeOnDatabase).toBeTruthy()
  })
})
