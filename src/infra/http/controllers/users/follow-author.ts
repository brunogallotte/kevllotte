import { FastifyReply, FastifyRequest } from 'fastify'

import { makeFollowAuthorUseCase } from '@/infra/database/prisma/factories/make-follow-author-use-case'

import { FollowPresenter } from '../../presenters/follow-presenter'
import { followAuthorParamsSchema } from './schemas'

export async function followAuthor(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authorId = await request.getCurrentUserId()

  const { followingAuthorId } = followAuthorParamsSchema.parse(request.params)

  const followAuthorUseCase = makeFollowAuthorUseCase()

  const result = await followAuthorUseCase.execute({
    followerAuthorId: authorId,
    followingAuthorId,
  })

  if (result.isLeft()) {
    return reply.status(400).send()
  }

  const follow = result.value.follow

  return reply.status(200).send({ follow: FollowPresenter.toHTTP(follow) })
}
