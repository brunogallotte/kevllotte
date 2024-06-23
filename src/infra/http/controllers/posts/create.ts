import { FastifyReply, FastifyRequest } from 'fastify'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { POST_STATUS } from '@/domain/blog/enterprise/entities/post'
import { makeCreatePostUseCase } from '@/infra/database/prisma/factories/make-create-post-use-case'

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
    authorId: userId,
    collabId,
    status: POST_STATUS[status],
  })

  if (createdPost.value instanceof ResourceNotFoundError) {
    return reply.status(400).send()
  }

  return reply.status(201).send({ post: createdPost.value?.post })
}
