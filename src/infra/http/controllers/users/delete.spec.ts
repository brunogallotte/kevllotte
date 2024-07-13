import request from 'supertest'
import { createAndAuthenticateUser } from 'test/utils/create-and-authenticate-user'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '../../app'

describe('Delete Author (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete an author', async () => {
    const { accessToken } = await createAndAuthenticateUser(app)

    const profileResponse = await request(app.server)
      .delete('/users/delete')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
  })
})
