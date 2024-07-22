import { FastifyReply, FastifyRequest } from 'fastify'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeRemoveSavedPostUseCase } from '@/infra/database/prisma/factories/make-remove-saved-post-use-case'

import { removeSavedPostParamsSchema } from './schemas'

export async function removeSavedPost(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { savedPostId } = removeSavedPostParamsSchema.parse(request.params)

  const removeSavedPostUseCase = makeRemoveSavedPostUseCase()

  const result = await removeSavedPostUseCase.execute({
    savedPostId,
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

  return reply.status(204).send()
}
