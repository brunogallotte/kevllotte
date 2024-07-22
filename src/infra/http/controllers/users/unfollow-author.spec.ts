import request from 'supertest'
import { AuthorFactory } from 'test/factories/make-author'
import { FollowFactory } from 'test/factories/make-follow'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '../../app'

describe('Unfollow Author (e2e)', () => {
  let authorFactory: AuthorFactory
  let followFactory: FollowFactory

  beforeAll(async () => {
    authorFactory = new AuthorFactory()
    followFactory = new FollowFactory()

    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to unfollow an author', async () => {
    const user = await authorFactory.makePrismaAuthor()

    const accessToken = app.jwt.sign({ sub: user.id.toString() })

    const anotherUser = await authorFactory.makePrismaAuthor()

    const follow = await followFactory.makePrismaFollow({
      followerAuthorId: user.id,
      followingAuthorId: anotherUser.id,
    })

    const followId = follow.id.toString()

    const response = await request(app.server)
      .delete(`/users/follow/${followId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toEqual(204)
  })
})
