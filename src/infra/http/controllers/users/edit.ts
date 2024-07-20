import { FastifyReply, FastifyRequest } from 'fastify'

import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeEditAuthorProfileUseCase } from '@/infra/database/prisma/factories/make-edit-author-use-case'

import { AuthorPresenter } from '../../presenters/author-presenter'
import { editAuthorProfileBodySchema } from './schemas'

export async function edit(request: FastifyRequest, reply: FastifyReply) {
  const authorId = await request.getCurrentUserId()

  const {
    name,
    username,
    bio,
    avatarUrl,
    linkedinUrl,
    githubUrl,
    instagramUrl,
    twitterUrl,
    websiteUrl,
  } = editAuthorProfileBodySchema.parse(request.body)

  const editAuthorProfileUseCase = makeEditAuthorProfileUseCase()

  const result = await editAuthorProfileUseCase.execute({
    authorId,
    name,
    username,
    bio,
    avatarUrl,
    linkedinUrl,
    githubUrl,
    instagramUrl,
    twitterUrl,
    websiteUrl,
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

  const author = result.value.author

  return reply.status(200).send({ author: AuthorPresenter.toHTTP(author) })
}
