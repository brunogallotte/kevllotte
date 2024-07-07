import { FastifyReply, FastifyRequest } from 'fastify'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { makeLikePostUseCase } from '@/infra/database/prisma/factories/make-list-post-use-case'

import { PostLikePresenter } from '../../presenters/post-like-presenter'
import { likePostParamsSchema } from './schemas'

export async function like(request: FastifyRequest, reply: FastifyReply) {
  const authorId = await request.getCurrentUserId()

  const { postId } = likePostParamsSchema.parse(request.params)

  const likePostUseCase = makeLikePostUseCase()

  const result = await likePostUseCase.execute({
    authorId,
    postId,
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

  const postLike = result.value.postLike

  return reply
    .status(201)
    .send({ postLike: PostLikePresenter.toHTTP(postLike) })
}
