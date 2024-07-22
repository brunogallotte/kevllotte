import request from 'supertest'
import { AuthorFactory } from 'test/factories/make-author'
import { FollowFactory } from 'test/factories/make-follow'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '../../app'

describe('Fetch Author Followers (e2e)', () => {
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

  it('should be able to fetch author followers', async () => {
    const user = await authorFactory.makePrismaAuthor()

    const accessToken = app.jwt.sign({ sub: user.id.toString() })

    const anotherUser = await authorFactory.makePrismaAuthor()
    const thirdUser = await authorFactory.makePrismaAuthor()

    const [follow, anotherFollow] = await Promise.all([
      await followFactory.makePrismaFollow({
        followingAuthorId: user.id,
        followerAuthorId: anotherUser.id,
      }),
      await followFactory.makePrismaFollow({
        followingAuthorId: user.id,
        followerAuthorId: thirdUser.id,
      }),
    ])

    const response = await request(app.server)
      .get('/users/followers')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      followers: expect.arrayContaining([
        expect.objectContaining({
          id: follow.id.toString(),
          followingAuthorId: user.id.toString(),
          followerAuthorId: anotherUser.id.toString(),
        }),
        expect.objectContaining({
          id: anotherFollow.id.toString(),
          followingAuthorId: user.id.toString(),
          followerAuthorId: thirdUser.id.toString(),
        }),
      ]),
    })
  })
})
