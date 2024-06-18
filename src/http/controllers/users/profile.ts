import { FastifyReply, FastifyRequest } from 'fastify'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeGetUserProfileUseCase } from '@/domain/blog/application/use-cases/factories/make-get-user-profile-use-case'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const userId = await request.getCurrentUserId()

  const getUserProfile = makeGetUserProfileUseCase()

  const result = await getUserProfile.execute({
    userId,
  })

  if (result.value instanceof ResourceNotFoundError) {
    return reply.status(400).send()
  }

  return reply.status(200).send({
    user: result.value.user,
  })
}
