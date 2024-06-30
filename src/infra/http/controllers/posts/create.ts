import { FastifyReply, FastifyRequest } from 'fastify'

import { POST_STATUS } from '@/domain/blog/enterprise/entities/post'
import { makeCreatePostUseCase } from '@/infra/database/prisma/factories/make-create-post-use-case'

import { createPostBodySchema } from './schemas'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const authorId = await request.getCurrentUserId()

  const { title, content, collabId, status } = createPostBodySchema.parse(
    request.body,
  )

  const createPostUseCase = makeCreatePostUseCase()

  const result = await createPostUseCase.execute({
    title,
    content,
    authorId,
    collabId,
    status: POST_STATUS[status],
  })

  if (result.isLeft()) {
    return reply.status(400).send()
  }

  return reply.status(201).send({ post: result.value?.post })
}
