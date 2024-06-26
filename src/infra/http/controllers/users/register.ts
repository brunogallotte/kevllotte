import { FastifyReply, FastifyRequest } from 'fastify'

import { AuthorAlreadyExistsError } from '@/domain/blog/application/use-cases/errors/author-already-exists-error'
import { makeRegisterAuthorUseCase } from '@/infra/database/prisma/factories/make-register-author-use-case'

import { registerAuthorBodySchema } from './schemas'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const body = registerAuthorBodySchema.parse(request.body)

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

  const registerAuthorUseCase = makeRegisterAuthorUseCase()

  const result = await registerAuthorUseCase.execute({
    name,
    email,
    password,
    bio: bio ?? null,
    avatarUrl: avatarUrl ?? null,
    linkedinUrl: linkedinUrl ?? null,
    githubUrl: githubUrl ?? null,
    instagramUrl: instagramUrl ?? null,
    twitterUrl: twitterUrl ?? null,
    websiteUrl: websiteUrl ?? null,
  })

  if (result.isLeft()) {
    const error = result.value

    switch (error.constructor) {
      case AuthorAlreadyExistsError:
        return reply.status(409).send(error.message)
      default:
        return reply.status(400).send(error.message)
    }
  }

  return reply.status(201).send()
}
