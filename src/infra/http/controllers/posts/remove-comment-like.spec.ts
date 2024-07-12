import request from 'supertest'
import { AuthorFactory } from 'test/factories/make-author'
import { CommentLikeFactory } from 'test/factories/make-comment-like'
import { PostFactory } from 'test/factories/make-post'
import { PostCommentFactory } from 'test/factories/make-post-comment'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '../../app'

describe('Remove Comment Like (e2e)', () => {
  let authorFactory: AuthorFactory
  let postFactory: PostFactory
  let postCommentFactory: PostCommentFactory
  let commentLikeFactory: CommentLikeFactory

  beforeAll(async () => {
    authorFactory = new AuthorFactory()
    postFactory = new PostFactory()
    postCommentFactory = new PostCommentFactory()
    commentLikeFactory = new CommentLikeFactory()

    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to remove a comment like', async () => {
    const user = await authorFactory.makePrismaAuthor()

    const accessToken = app.jwt.sign({ sub: user.id.toString() })

    const post = await postFactory.makePrismaPost({
      authorId: user.id,
    })

    const postId = post.id.toString()

    const comment = await postCommentFactory.makePrismaPostComment({
      authorId: user.id,
      postId: post.id,
    })

    const commentId = comment.id.toString()

    const like = await commentLikeFactory.makePrismaCommentLike({
      authorId: user.id,
      commentId: comment.id,
    })

    const likeId = like.id.toString()

    const response = await request(app.server)
      .post(`/posts/${postId}/comments/${commentId}/likes/${likeId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toEqual(200)
  })
})
