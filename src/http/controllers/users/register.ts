import { FastifyReply, FastifyRequest } from 'fastify'

import { UserAlreadyExistsError } from '@/domain/blog/application/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/domain/blog/application/use-cases/factories/make-register-use-case'
import { registerBodySchema } from '@/http/schemas'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const body = registerBodySchema.parse(request.body)

  const {
    name,
    email,
    password,
    bio,
    avatarUrl,
    linkedinUrl,
    githubUrl,
    instagramUrl,
    twitterUrl,
    websiteUrl,
  } = body

  const registerUseCase = makeRegisterUseCase()

  const createdUser = await registerUseCase.execute({
    name,
    email,
    password,
    bio,
    avatarUrl,
    linkedinUrl,
    githubUrl,
    instagramUrl,
    twitterUrl,
    websiteUrl,
  })

  if (createdUser.value instanceof UserAlreadyExistsError) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
