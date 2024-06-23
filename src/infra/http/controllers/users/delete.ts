import { FastifyReply, FastifyRequest } from 'fastify'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeDeleteUserUseCase } from '@/infra/database/prisma/factories/make-delete-user-use-case'

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  const userId = await request.getCurrentUserId()

  const deleteUser = makeDeleteUserUseCase()

  const result = await deleteUser.execute({
    userId,
  })

  if (result.value instanceof ResourceNotFoundError) {
    return reply.status(400).send()
  }

  return reply.status(200).send()
}
