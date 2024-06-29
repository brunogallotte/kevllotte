import { FastifyReply, FastifyRequest } from 'fastify'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeDeleteAuthorUseCase } from '@/infra/database/prisma/factories/make-delete-author-use-case'

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  const authorId = await request.getCurrentUserId()

  const deleteAuthorUseCase = makeDeleteAuthorUseCase()

  const result = await deleteAuthorUseCase.execute({
    authorId,
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
