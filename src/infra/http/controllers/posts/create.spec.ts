import request from 'supertest'
import { AuthorFactory } from 'test/factories/make-author'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '../../app'

describe('Create Post (e2e)', () => {
  let authorFactory: AuthorFactory

  beforeAll(async () => {
    authorFactory = new AuthorFactory()

    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a post', async () => {
    const user = await authorFactory.makePrismaAuthor()

    const accessToken = app.jwt.sign({ sub: user.id.toString() })

    const response = await request(app.server)
      .post('/posts')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Test post',
        content: 'Test post content',
      })

    expect(response.statusCode).toEqual(201)
  })
})
