import request from 'supertest'
import { AuthorFactory } from 'test/factories/make-author'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '../../app'

describe('Report Author (e2e)', () => {
  let authorFactory: AuthorFactory

  beforeAll(async () => {
    authorFactory = new AuthorFactory()

    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to report an author', async () => {
    const user = await authorFactory.makePrismaAuthor()

    const accessToken = app.jwt.sign({ sub: user.id.toString() })

    const anotherUser = await authorFactory.makePrismaAuthor()

    const userId = user.id.toString()
    const anotherUserId = anotherUser.id.toString()

    const response = await request(app.server)
      .post('/users/report')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        reportedAuthorId: anotherUserId,
        reason: 'Report reason',
        description: 'Report description',
      })

    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual({
      report: expect.objectContaining({
        reportedById: userId,
        reportedAuthorId: anotherUserId,
        reason: 'Report reason',
        description: 'Report description',
      }),
    })
  })
})
