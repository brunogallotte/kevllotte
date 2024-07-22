import { FastifyReply, FastifyRequest } from 'fastify'

import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeDeletePostUseCase } from '@/infra/database/prisma/factories/make-delete-post-use-case'

import { deletePostBodySchema } from './schemas'

export async function deletePost(request: FastifyRequest, reply: FastifyReply) {
  const authorId = await request.getCurrentUserId()

  const { postId } = deletePostBodySchema.parse(request.body)

  const deletePostUseCase = makeDeletePostUseCase()

  const result = await deletePostUseCase.execute({
    postId,
    authorId,
  })

  if (result.isLeft()) {
    const error = result.value

    switch (error.constructor) {
      case ResourceNotFoundError:
        return reply.status(404).send(error.message)
      case NotAllowedError:
        return reply.status(401).send(error.message)
      default:
        return reply.status(400).send(error.message)
    }
  }

  return reply.status(204).send()
}
