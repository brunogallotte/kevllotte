import request from 'supertest'
import { createAndAuthenticateUser } from 'test/utils/create-and-authenticate-user'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '../../app'

describe('Get Author Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get author profile', async () => {
    const { accessToken } = await createAndAuthenticateUser(app)

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.author).toEqual(
      expect.objectContaining({
        email: 'johndoe@example.com',
      }),
    )
  })
})
