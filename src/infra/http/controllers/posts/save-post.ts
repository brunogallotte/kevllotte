import { FastifyReply, FastifyRequest } from 'fastify'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeSavePostUseCase } from '@/infra/database/prisma/factories/make-save-post-use-case'

import { savePostParamsSchema } from './schemas'

export async function save(request: FastifyRequest, reply: FastifyReply) {
  const { postId } = savePostParamsSchema.parse(request.params)

  const savePostUseCase = makeSavePostUseCase()

  const result = await savePostUseCase.execute({
    postId,
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

  return reply.status(200).send()
}
