import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserNotFound } from '@/domain/blog/application/use-cases/errors/user-not-found'
import { makeAuthenticateUseCase } from '@/domain/blog/application/use-cases/factories/authenticate-use-case'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    password: z.string().min(8),
    email: z.string().email(),
  })

  const { password, email } = authenticateBodySchema.parse(request.body)

  const authenticateUseCase = makeAuthenticateUseCase()

  const authenticateUser = await authenticateUseCase.execute({
    password,
    email,
  })

  if (authenticateUser.value instanceof UserNotFound) {
    return reply.status(404).send()
  }

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: authenticateUser.value.user.id,
      },
    },
  )

  return reply.status(200).send({
    token,
  })
}
