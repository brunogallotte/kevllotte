import { FastifyReply, FastifyRequest } from 'fastify'

import { makeUnfollowAuthorUseCase } from '@/infra/database/prisma/factories/make-unfollow-author-use-case'

import { unfollowAuthorParamsSchema } from './schemas'

export async function unfollowAuthor(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authorId = await request.getCurrentUserId()

  const { followId } = unfollowAuthorParamsSchema.parse(request.params)

  const unfollowAuthorUseCase = makeUnfollowAuthorUseCase()

  const result = await unfollowAuthorUseCase.execute({
    followId,
    followerAuthorId: authorId,
  })

  if (result.isLeft()) {
    return reply.status(400).send()
  }

  return reply.status(204).send()
}
