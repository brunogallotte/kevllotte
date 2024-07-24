import { FastifyReply, FastifyRequest } from 'fastify'

import { makeFetchAuthorFollowingsUseCase } from '@/infra/database/prisma/factories/make-fetch-author-followings'

import { FollowPresenter } from '../../presenters/follow-presenter'
import { paginationQuerySchema } from '../schemas'
import { fetchAuthorFollowingsParamsSchema } from './schemas'

export async function fetchAuthorFollowings(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { page } = paginationQuerySchema.parse(request.query)

  const { authorId } = fetchAuthorFollowingsParamsSchema.parse(request.params)

  const fetchAuthorFollowingsUseCase = makeFetchAuthorFollowingsUseCase()

  const result = await fetchAuthorFollowingsUseCase.execute({
    authorId,
    page,
  })

  if (result.isLeft()) {
    return reply.status(400).send()
  }

  const followings = result.value.followings

  return reply.status(200).send({
    followings: followings.map((following) =>
      FollowPresenter.toHTTP(following),
    ),
  })
}
