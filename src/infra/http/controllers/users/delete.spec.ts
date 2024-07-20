import request from 'supertest'
import { AuthorFactory } from 'test/factories/make-author'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '../../app'

describe('Delete Author (e2e)', () => {
  let authorFactory: AuthorFactory

  beforeAll(async () => {
    authorFactory = new AuthorFactory()

    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete an author', async () => {
    const user = await authorFactory.makePrismaAuthor()

    const accessToken = app.jwt.sign({ sub: user.id.toString() })

    const profileResponse = await request(app.server)
      .delete('/users/delete')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
  })
})
