import request from 'supertest'
import { createAndAuthenticateUser } from 'test/utils/create-and-authenticate-user'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { prisma } from '@/lib/prisma'

import { app } from '../../app'

describe('Delete Post (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete a post', async () => {
    const { accessToken } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const post = await prisma.post.create({
      data: {
        userId: user.id,
        title: 'Test post',
        content: 'Test post content',
        slug: 'test-post',
      },
    })

    const deletePostResponse = await request(app.server)
      .post('/posts/delete')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        postId: post.id,
      })

    expect(deletePostResponse.statusCode).toEqual(200)
  })
})
