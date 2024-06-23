import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeAuthenticateUseCase } from '@/infra/database/prisma/factories/make-authenticate-use-case'

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

  if (authenticateUser.value instanceof ResourceNotFoundError) {
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

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: authenticateUser.value.user.id,
        expiresIn: '7d',
      },
    },
  )

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({
      token,
    })
}
