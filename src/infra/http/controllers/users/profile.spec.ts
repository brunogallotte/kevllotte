import request from 'supertest'
import { AuthorFactory } from 'test/factories/make-author'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '../../app'

describe('Get Author Profile (e2e)', () => {
  let authorFactory: AuthorFactory

  beforeAll(async () => {
    authorFactory = new AuthorFactory()

    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get author profile', async () => {
    const user = await authorFactory.makePrismaAuthor({
      email: 'johndoe@example.com',
    })

    const accessToken = app.jwt.sign({ sub: user.id.toString() })

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body).toEqual({
      author: expect.objectContaining({
        email: 'johndoe@example.com',
      }),
    })
  })
})
