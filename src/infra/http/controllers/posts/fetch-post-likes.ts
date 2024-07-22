import { FastifyReply, FastifyRequest } from 'fastify'

import { makeFetchPostLikesUseCase } from '@/infra/database/prisma/factories/make-fetch-post-likes-use-case'

import { PostLikePresenter } from '../../presenters/post-like-presenter'
import { paginationQuerySchema } from '../schemas'
import { fetchPostLikesParamsSchema } from './schemas'

export async function fetchPostLikes(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { postId } = fetchPostLikesParamsSchema.parse(request.params)

  const { page } = paginationQuerySchema.parse(request.query)

  const fetchPostLikesUseCase = makeFetchPostLikesUseCase()

  const result = await fetchPostLikesUseCase.execute({
    postId,
    page,
  })

  if (result.isLeft()) {
    return reply.status(400).send()
  }

  const postLikes = result.value.postLikes

  return reply.status(200).send({
    postLikes: postLikes.map((postLike) => PostLikePresenter.toHTTP(postLike)),
  })
}
