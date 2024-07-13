import request from 'supertest'
import { createAndAuthenticateUser } from 'test/utils/create-and-authenticate-user'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '../../app'

describe('Edit Author Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to edit an author profile', async () => {
    const { accessToken } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .patch('/users/edit')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        bio: 'Test bio',
        avatarUrl: 'https://test-url.com',
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.author).toEqual(
      expect.objectContaining({
        bio: 'Test bio',
        avatarUrl: 'https://test-url.com',
      }),
    )
  })
})
