import request from 'supertest'
import { AuthorFactory } from 'test/factories/make-author'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '../../app'

describe('Edit Author Profile (e2e)', () => {
  let authorFactory: AuthorFactory

  beforeAll(async () => {
    authorFactory = new AuthorFactory()

    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to edit an author profile', async () => {
    const user = await authorFactory.makePrismaAuthor()

    const accessToken = app.jwt.sign({ sub: user.id.toString() })

    const response = await request(app.server)
      .patch('/users/edit')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        bio: 'Test bio',
        username: 'johndoe',
        avatarUrl: 'https://test-url.com',
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      author: expect.objectContaining({
        bio: 'Test bio',
        username: 'johndoe',
        avatarUrl: 'https://test-url.com',
      }),
    })
  })
})
