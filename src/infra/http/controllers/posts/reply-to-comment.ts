import { FastifyReply, FastifyRequest } from 'fastify'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeReplyToCommentUseCase } from '@/infra/database/prisma/factories/make-reply-to-comment-use-case'

import { PostCommentPresenter } from '../../presenters/post-comment-presenter'
import { replyToCommentBodySchema, replyToCommentParamsSchema } from './schemas'

export async function replyToComment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authorId = await request.getCurrentUserId()

  const { content } = replyToCommentBodySchema.parse(request.body)

  const { postId, replyToId } = replyToCommentParamsSchema.parse(request.params)

  const replyToCommentUseCase = makeReplyToCommentUseCase()

  const result = await replyToCommentUseCase.execute({
    authorId,
    postId,
    content,
    replyToId,
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

  const comment = result.value.comment

  return reply
    .status(201)
    .send({ comment: PostCommentPresenter.toHTTP(comment) })
}
