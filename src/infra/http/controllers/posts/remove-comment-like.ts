import { FastifyReply, FastifyRequest } from 'fastify'

import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeDislikeCommentUseCase } from '@/infra/database/prisma/factories/make-dislike-comment-use-case'

import { removeCommentLikeParamsSchema } from './schemas'

export async function removeCommentLike(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authorId = await request.getCurrentUserId()

  const { likeId } = removeCommentLikeParamsSchema.parse(request.params)

  const dislikeCommentUseCase = makeDislikeCommentUseCase()

  const result = await dislikeCommentUseCase.execute({
    authorId,
    likeId,
  })

  if (result.isLeft()) {
    const error = result.value

    switch (error.constructor) {
      case ResourceNotFoundError:
        return reply.status(404).send(error.message)
      case NotAllowedError:
        return reply.status(401).send(error.message)
      default:
        return reply.status(400).send(error.message)
    }
  }

  return reply.status(200).send()
}
