import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserAlreadyExistsError } from '@/domain/blog/application/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/domain/blog/application/use-cases/factories/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    bio: z.string().optional(),
    avatarUrl: z.string().optional(),
    linkedinUrl: z.string().optional(),
    githubUrl: z.string().optional(),
    instagramUrl: z.string().optional(),
    twitterUrl: z.string().optional(),
    websiteUrl: z.string().optional(),
  })

  const {
    name,
    email,
    bio,
    password,
    avatarUrl,
    linkedinUrl,
    githubUrl,
    instagramUrl,
    twitterUrl,
    websiteUrl,
  } = registerBodySchema.parse(request.body)

  const registerUseCase = makeRegisterUseCase()

  const createUser = await registerUseCase.execute({
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

  if (createUser.value instanceof UserAlreadyExistsError) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
