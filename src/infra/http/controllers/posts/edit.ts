import { FastifyReply, FastifyRequest } from 'fastify'

import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { POST_STATUS } from '@/domain/blog/enterprise/entities/post'
import { makeEditPostUseCase } from '@/infra/database/prisma/factories/make-edit-post-use-case'

import { editPostBodySchema } from './schemas'

export async function edit(request: FastifyRequest, reply: FastifyReply) {
  const userId = await request.getCurrentUserId()

  const { postId, title, content, status } = editPostBodySchema.parse(
    request.body,
  )

  const editPostUseCase = makeEditPostUseCase()

  const result = await editPostUseCase.execute({
    authorId: userId,
    postId,
    title,
    content,
    status: POST_STATUS[status],
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

  return reply.status(200).send({ post: result.value.post })
}
