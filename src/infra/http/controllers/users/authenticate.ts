import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { WrongCredentialsError } from '@/domain/blog/application/use-cases/errors/wrong-credentials-error'
import { makeAuthenticateAuthorUseCase } from '@/infra/database/prisma/factories/make-authenticate-author-use-case'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateAuthorBodySchema = z.object({
    password: z.string().min(8),
    email: z.string().email(),
  })

  const { password, email } = authenticateAuthorBodySchema.parse(request.body)

  const authenticateAuthorUseCase = makeAuthenticateAuthorUseCase(reply)

  const result = await authenticateAuthorUseCase.execute({
    password,
    email,
  })

  if (result.isLeft()) {
    const error = result.value

    switch (error.constructor) {
      case WrongCredentialsError:
        return reply.status(401).send(error.message)
      default:
        return reply.status(400).send(error.message)
    }
  }

  const { accessToken, refreshToken } = result.value

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({
      accessToken,
    })
}
