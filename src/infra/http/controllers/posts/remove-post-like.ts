import { FastifyReply, FastifyRequest } from 'fastify'

import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeDislikePostUseCase } from '@/infra/database/prisma/factories/make-dislike-post-use-case'

import { removePostLikeParamsSchema } from './schemas'

export async function removePostLike(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authorId = await request.getCurrentUserId()

  const { postId } = removePostLikeParamsSchema.parse(request.params)

  const dislikePostUseCase = makeDislikePostUseCase()

  const result = await dislikePostUseCase.execute({
    authorId,
    postId,
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
