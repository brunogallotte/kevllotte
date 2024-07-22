import { FastifyReply, FastifyRequest } from 'fastify'

import { makeFetchAuthorFollowersUseCase } from '@/infra/database/prisma/factories/make-fetch-author-followers'

import { FollowPresenter } from '../../presenters/follow-presenter'
import { paginationQuerySchema } from '../schemas'

export async function fetchAuthorFollowers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authorId = await request.getCurrentUserId()

  const { page } = paginationQuerySchema.parse(request.query)

  const fetchAuthorFollowersUseCase = makeFetchAuthorFollowersUseCase()

  const result = await fetchAuthorFollowersUseCase.execute({
    authorId,
    page,
  })

  if (result.isLeft()) {
    return reply.status(400).send()
  }

  const followers = result.value.followers

  return reply.status(200).send({
    followers: followers.map((follower) => FollowPresenter.toHTTP(follower)),
  })
}
