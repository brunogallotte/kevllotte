import { FastifyReply, FastifyRequest } from 'fastify'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeLikeCommentUseCase } from '@/infra/database/prisma/factories/make-like-comment-use-case'

import { CommentLikePresenter } from '../../presenters/comment-like-presenter'
import { likeCommentParamsSchema } from './schemas'

export async function likeComment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authorId = await request.getCurrentUserId()

  const { commentId } = likeCommentParamsSchema.parse(request.params)

  const likeCommentUseCase = makeLikeCommentUseCase()

  const result = await likeCommentUseCase.execute({
    authorId,
    commentId,
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

  const commentLike = result.value.commentLike

  return reply
    .status(201)
    .send({ commentLike: CommentLikePresenter.toHTTP(commentLike) })
}
