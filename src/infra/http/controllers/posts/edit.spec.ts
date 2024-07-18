import request from 'supertest'
import { createAndAuthenticateUser } from 'test/utils/create-and-authenticate-user'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { prisma } from '@/lib/prisma'

import { app } from '../../app'

describe('Edit Post (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to edit a post', async () => {
    const { accessToken } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const post = await prisma.post.create({
      data: {
        title: 'Test post',
        content: 'Test content',
        slug: 'test-post',
        userId: user.id,
      },
    })

    const postId = post.id

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
