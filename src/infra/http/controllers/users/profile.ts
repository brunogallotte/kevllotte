import { FastifyReply, FastifyRequest } from 'fastify'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeGetAuthorProfileUseCase } from '@/infra/database/prisma/factories/make-get-author-profile-use-case'

import { AuthorPresenter } from '../../presenters/author-presenter'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const authorId = await request.getCurrentUserId()

  const getAuthorProfile = makeGetAuthorProfileUseCase()

  const result = await getAuthorProfile.execute({
    authorId,
  })

  if (result.isLeft()) {
    const error = result.value

    switch (error.constructor) {
      case ResourceNotFoundError:
        return reply.status(404).send(error.message)
      default:
        return reply.status(400).send(error.message)
    }
  }

  const author = result.value.author

  return reply.status(200).send({
    author: AuthorPresenter.toHTTP(author),
  })
}
