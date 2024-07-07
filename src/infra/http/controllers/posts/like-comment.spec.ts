import request from 'supertest'
import { AuthorFactory } from 'test/factories/make-author'
import { PostFactory } from 'test/factories/make-post'
import { PostCommentFactory } from 'test/factories/make-post-comment'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { prisma } from '@/lib/prisma'

import { app } from '../../app'

describe('Like Comment (e2e)', () => {
  let authorFactory: AuthorFactory
  let postFactory: PostFactory
  let postCommentFactory: PostCommentFactory

  beforeAll(async () => {
    authorFactory = new AuthorFactory()
    postFactory = new PostFactory()
    postCommentFactory = new PostCommentFactory()

    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to like a comment', async () => {
    const user = await authorFactory.makePrismaAuthor()

    const accessToken = app.jwt.sign({ sub: user.id.toString() })

    const post = await postFactory.makePrismaPost({
      authorId: user.id,
    })

    const comment = await postCommentFactory.makePrismaPostComment({
      postId: post.id,
      authorId: user.id,
    })

    const postId = post.id.toString()
    const commentId = comment.id.toString()

    const response = await request(app.server)
      .post(`/posts/${postId}/comments/${commentId}/like`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toEqual(201)

    const commentLikeOnDatabase = await prisma.commentLike.findFirst({
      where: {
        commentId,
      },
    })

    expect(commentLikeOnDatabase).toBeTruthy()
  })
})
