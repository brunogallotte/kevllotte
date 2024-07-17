import { FastifyReply, FastifyRequest } from 'fastify'

import { makeFetchPostTagsUseCase } from '@/infra/database/prisma/factories/make-fetch-post-tags-use-case'

import { PostTagPresenter } from '../../presenters/post-tag-presenter'
import { paginationQuerySchema } from '../schemas'
import { fetchPostTagsParamsSchema } from './schemas'

export async function fetchPostTags(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { postId } = fetchPostTagsParamsSchema.parse(request.params)

  const { page } = paginationQuerySchema.parse(request.query)

  const fetchPostTagsUseCase = makeFetchPostTagsUseCase()

  const result = await fetchPostTagsUseCase.execute({
    postId,
    page,
  })

  if (result.isLeft()) {
    return reply.status(400).send()
  }

  const postTags = result.value.tags

  return reply.status(200).send({
    postTags: postTags.map((postTag) => PostTagPresenter.toHTTP(postTag)),
  })
}
