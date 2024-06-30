import { FastifyReply, FastifyRequest } from 'fastify'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeCommentOnPostUseCase } from '@/infra/database/prisma/factories/make-comment-on-post-use-case'

import { PostCommentPresenter } from '../../presenters/post-comment-presenter'
import { commentOnPostBodySchema, commentOnPostParamsSchema } from './schemas'

export async function comment(request: FastifyRequest, reply: FastifyReply) {
  const authorId = await request.getCurrentUserId()

  const { content } = commentOnPostBodySchema.parse(request.body)

  const { postId } = commentOnPostParamsSchema.parse(request.params)

  const commentOnPostUseCase = makeCommentOnPostUseCase()

  const result = await commentOnPostUseCase.execute({
    authorId,
    postId,
    content,
  })

  if (result.isLeft()) {
    const error = result.value

    switch (error.constructor) {
      case ResourceNotFoundError:
        return reply.status(404).send(error.message)
      default:
        return reply.status(400).send(error.message)
    }
  }

  const postComment = result.value.postComment

  return reply
    .status(201)
    .send({ postComment: PostCommentPresenter.toHTTP(postComment) })
}
