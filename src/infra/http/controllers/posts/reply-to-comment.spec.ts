import request from 'supertest'
import { AuthorFactory } from 'test/factories/make-author'
import { PostFactory } from 'test/factories/make-post'
import { PostCommentFactory } from 'test/factories/make-post-comment'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { prisma } from '@/lib/prisma'

import { app } from '../../app'

describe('Reply To Comment (e2e)', () => {
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

  it('should be able to reply a comment', async () => {
    const user = await authorFactory.makePrismaAuthor()

    const accessToken = app.jwt.sign({ sub: user.id.toString() })

    const post = await postFactory.makePrismaPost({
      authorId: user.id,
    })

    const comment = await postCommentFactory.makePrismaPostComment({
      authorId: user.id,
      postId: post.id,
      content: 'Comment 01',
    })

    const postId = post.id.toString()
    const commentId = comment.id.toString()

    const response = await request(app.server)
      .post(`/posts/${postId}/comments/${commentId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        content: 'New reply comment',
      })

    expect(response.statusCode).toEqual(201)

    const replyCommentOnDatabase = await prisma.postComment.findFirst({
      where: {
        content: 'New reply comment',
      },
    })

    expect(replyCommentOnDatabase).toBeTruthy()
  })
})
