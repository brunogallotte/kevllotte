import { makeRegisterUseCase } from '@/domain/blog/application/use-cases/factories/make-register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    bio: z.string().nullable(),
    password: z.string().min(8),
    avatarUrl: z.string().url().nullable(),
    linkedinUrl: z.string().url().nullable(),
    githubUrl: z.string().url().nullable(),
    instagramUrl: z.string().url().nullable(),
    twitterUrl: z.string().url().nullable(),
    websiteUrl: z.string().url().nullable(),
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

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      name,
      email,
      passwordHash: password,
      bio,
      avatarUrl,
      linkedinUrl,
      githubUrl,
      instagramUrl,
      twitterUrl,
      websiteUrl,
    })
  }
}
