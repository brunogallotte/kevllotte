import { FastifyReply, FastifyRequest } from 'fastify'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeCreatePostUseCase } from '@/domain/blog/application/use-cases/factories/make-create-post-use-case'

import { createPostBodySchema } from './schemas'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const userId = await request.getCurrentUserId()

  const { title, content, collabId, status } = createPostBodySchema.parse(
    request.body,
  )

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

  return reply.status(201).send({ postId: createdPost.value.post.id })
}
