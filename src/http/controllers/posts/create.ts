import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeCreatePostUseCase } from '@/domain/blog/application/use-cases/factories/make-create-post-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPostBodySchema = z.object({
    title: z.string(),
    content: z.string(),
    userId: z.string().uuid(),
    collabId: z.string().uuid().optional(),
    status: z.enum(['PUBLISHED', 'DRAFT']).default('DRAFT'),
  })

  const { title, content, userId, collabId, status } =
    createPostBodySchema.parse(request.body)

  const createPostUseCase = makeCreatePostUseCase()

  const createdPost = await createPostUseCase.execute({
    title,
    content,
    userId,
    collabId,
    status,
  })

  if (createdPost.value instanceof ResourceNotFoundError) {
    return reply.status(400).send()
  }

  return reply.status(201).send()
}
