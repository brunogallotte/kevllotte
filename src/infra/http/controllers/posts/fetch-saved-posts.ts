import { FastifyReply, FastifyRequest } from 'fastify'

import { makeFetchSavedPostsUseCase } from '@/infra/database/prisma/factories/make-fetch-saved-posts-use-case'

import { PostPresenter } from '../../presenters/post-presenter'
import { paginationQuerySchema } from '../schemas'

export async function fetchSavedPosts(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authorId = await request.getCurrentUserId()

  const { page } = paginationQuerySchema.parse(request.query)

  const fetchSavedPostsUseCase = makeFetchSavedPostsUseCase()

  const result = await fetchSavedPostsUseCase.execute({
    authorId,
    page,
  })

  if (result.isLeft()) {
    return reply.status(400).send()
  }

  const savedPosts = result.value.savedPosts

  return reply.status(200).send({
    savedPosts: savedPosts.map((savedPost) => PostPresenter.toHTTP(savedPost)),
  })
}
