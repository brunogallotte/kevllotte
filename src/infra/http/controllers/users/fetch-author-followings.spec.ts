import request from 'supertest'
import { AuthorFactory } from 'test/factories/make-author'
import { FollowFactory } from 'test/factories/make-follow'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '../../app'

describe('Fetch Author Followings (e2e)', () => {
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

  it('should be able to fetch author followings', async () => {
    const user = await authorFactory.makePrismaAuthor()

    const accessToken = app.jwt.sign({ sub: user.id.toString() })

    const anotherUser = await authorFactory.makePrismaAuthor()
    const thirdUser = await authorFactory.makePrismaAuthor()

    const [follow, anotherFollow] = await Promise.all([
      await followFactory.makePrismaFollow({
        followingAuthorId: anotherUser.id,
        followerAuthorId: user.id,
      }),
      await followFactory.makePrismaFollow({
        followingAuthorId: thirdUser.id,
        followerAuthorId: user.id,
      }),
    ])

    const response = await request(app.server)
      .get('/users/followings')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      followings: expect.arrayContaining([
        expect.objectContaining({
          id: follow.id.toString(),
          followingAuthorId: anotherUser.id.toString(),
          followerAuthorId: user.id.toString(),
        }),
        expect.objectContaining({
          id: anotherFollow.id.toString(),
          followingAuthorId: thirdUser.id.toString(),
          followerAuthorId: user.id.toString(),
        }),
      ]),
    })
  })
})
